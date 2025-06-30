import { IResolvers } from "@graphql-tools/utils";
import CandidateModel from "../../models/Candidate";
import {
  createCandidateSchema,
  updateCandidateSchema,
  CreateCandidateInput,
  UpdateCandidateInput,
} from "../../validators/candidate";
import { requireAuth } from "../../utils/auth";
import { validateAgainstSchema } from "../../utils/validation";

const candidateResolvers: IResolvers = {
  Query: {
    getCandidateById: async (_, { id }) => {
      return await CandidateModel.findById(id);
    },

    getMyCandidateProfile: async (_, __, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      return await CandidateModel.findOne({ userId: authUser.id });
    },
  },

  Mutation: {
    createCandidate: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, createCandidateSchema);
      const validatedInput = parsed.data as CreateCandidateInput;

      try {
        const existing = await CandidateModel.findOne({
          userId: authUser.id,
        });
        if (existing) throw new Error("CandidateExistsError");

        const newCandidate = await CandidateModel.create({
          userId: authUser.id,
          ...validatedInput,
        });

        return newCandidate;
      } catch (error: any) {
        if (error.message === "CandidateExistsError") {
          console.warn(
            "Candidate profile already exists for user:",
            authUser.id
          );
          throw new Error("Candidate profile already exists");
        }

        console.error("Error creating candidate profile:", error.message);
        throw new Error("Could not create candidate profile.");
      }
    },

    updateMyCandidateProfile: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, updateCandidateSchema);
      const validatedInput = parsed.data as UpdateCandidateInput;

      try {
        const updated = await CandidateModel.findOneAndUpdate(
          { userId: authUser.id },
          { $set: validatedInput },
          { new: true }
        );

        if (!updated) throw new Error("NotFoundError");

        return updated;
      } catch (error: any) {
        if (error.message === "NotFoundError") {
          console.warn("Candidate profile not found for user:", authUser.id);
          throw new Error("Candidate profile not found");
        }

        console.error("Error updating candidate profile:", error.message);
        throw new Error("Could not update candidate profile.");
      }
    },
  },
};

export default candidateResolvers;
