import { ZodError } from "zod";
import { IResolvers } from "@graphql-tools/utils";
import JobModel from "../../models/Job";
import {
  createJobSchema,
  updateJobSchema,
  CreateJobInput,
  UpdateJobInput,
  JobTypes,
} from "../../validators/job";
import { requireAuth } from "../../utils/auth";
import { validateAgainstSchema } from "../../utils/validation";

const jobResolvers: IResolvers = {
  Query: {
    getAllJobs: async () => {
      try {
        return await JobModel.find().sort({ createdAt: -1 });
      } catch (error: any) {
        console.error("Error fetching jobs:", error.message);
        throw new Error("Could not retrieve jobs.");
      }
    },

    getJobById: async (_, { id }) => {
      try {
        const job = await JobModel.findById(id);
        if (!job) throw new Error("Job not found");
        return job;
      } catch (error: any) {
        console.error("Error fetching job by ID:", error.message);
        throw new Error("Could not retrieve job.");
      }
    },

    getJobsByCompany: async (_, { companyId }) => {
      try {
        return await JobModel.find({ companyId }).sort({ createdAt: -1 });
      } catch (error: any) {
        console.error("Error fetching jobs by company:", error.message);
        throw new Error("Could not retrieve jobs.");
      }
    },
  },

  Mutation: {
    createJob: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, createJobSchema);
      const validatedInput = parsed.data as CreateJobInput;

      try {
        const newJob = new JobModel({
          ...validatedInput,
          postedBy: authUser.id,
        });
        return await newJob.save();
      } catch (error: any) {
        console.error("Error creating job:", error.message);
        throw new Error("Could not create job.");
      }
    },

    updateJob: async (_, { id, input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, updateJobSchema);
      const validatedInput = parsed.data as UpdateJobInput;

      try {
        const updated = await JobModel.findByIdAndUpdate(id, validatedInput, {
          new: true,
        });
        if (!updated) throw new Error("Job not found");
        return updated;
      } catch (error: any) {
        console.error("Error updating job:", error.message);
        throw new Error("Could not update job.");
      }
    },

    deleteJob: async (_, { id }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      try {
        const result = await JobModel.findByIdAndDelete(id);
        return !!result;
      } catch (error: any) {
        console.error("Error deleting job:", error.message);
        throw new Error("Could not delete job.");
      }
    },
  },
};

export default jobResolvers;
