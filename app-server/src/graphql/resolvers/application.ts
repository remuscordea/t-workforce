import { IResolvers } from "@graphql-tools/utils";
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
  CreateApplicationInput,
  UpdateApplicationStatusInput,
} from "../../validators/application";
import ApplicationModel, { ApplicationStatus } from "../../models/Application";
import CandidateModel from "../../models/Candidate";
import { requireAuth, requireAuthWithRole } from "../../utils/auth";
import { validateAgainstSchema } from "../../utils/validation";

const applicationResolvers: IResolvers = {
  Query: {
    getApplications: async (_, __, context) => {
      requireAuthWithRole(context.user, ["recruiter", "admin"]);
      return await ApplicationModel.find();
    },

    getApplicationById: async (_, { id }, context) => {
      requireAuth(context.user);

      const application = await ApplicationModel.findById(id);

      if (
        context.user.role !== "admin" &&
        application?.candidateId.toString() !== context.user.id
      ) {
        throw new Error("Access denied");
      }

      return application;
    },

    getApplicationsByJob: async (_, { jobId }, context) => {
      requireAuth(context.user);
      return await ApplicationModel.find({ jobId });
    },

    getApplicationsByCandidate: async (_, { candidateId }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Ensure the candidate exists and the user is authorized to access it
      const candidate = await CandidateModel.findOne({ userId: authUser.id });
      if (
        !candidate ||
        (candidate._id.toString() !== candidateId && authUser.role !== "admin")
      ) {
        throw new Error("Unauthorized");
      }

      return await ApplicationModel.find({ candidateId });
    },
  },

  Mutation: {
    createApplication: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, createApplicationSchema);
      const validatedInput = parsed.data as CreateApplicationInput;

      // Ensure the candidate exists and the user is authorized
      const candidate = await CandidateModel.findOne({
        userId: authUser.id,
      });
      if (
        !candidate ||
        candidate._id.toString() !== validatedInput.candidateId
      ) {
        throw new Error("Unauthorized");
      }

      // Check if the application already applied for this job
      const existing = await ApplicationModel.findOne({
        candidateId: validatedInput.candidateId,
        jobId: validatedInput.jobId,
      });

      if (existing) {
        throw new Error("You have already applied to this job.");
      }

      const newApp = new ApplicationModel({
        ...validatedInput,
        status: ApplicationStatus.PENDING,
      });

      return await newApp.save();
    },

    updateApplicationStatus: async (_, { input }, context) => {
      // Ensure the user is authenticated and is a recruiter or admin
      requireAuthWithRole(context.user, ["recruiter", "admin"]);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(
        input,
        updateApplicationStatusSchema
      );
      const validatedInput = parsed.data as UpdateApplicationStatusInput;

      // Check if the application exists
      const application = await ApplicationModel.findById(
        validatedInput.applicationId
      );
      if (!application) throw new Error("Application not found");

      application.status =
        ApplicationStatus[
          validatedInput.status as keyof typeof ApplicationStatus
        ];
      if (validatedInput.notes) application.notes = validatedInput.notes;

      return await application.save();
    },
  },
};

export default applicationResolvers;
