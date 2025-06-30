import dotenv from "dotenv";
import { IResolvers } from "@graphql-tools/utils";
import BookmarkModel from "../../models/Bookmark";
import { requireAuth } from "../../utils/auth";

dotenv.config();

const bookmarkResolvers: IResolvers = {
  Query: {
    getBookmarksByCandidate: async (_, __, context) => {
      const authUser = requireAuth(context.user);
      return await BookmarkModel.find({ candidateId: authUser.id });
    },
  },

  Mutation: {
    addBookmark: async (_, { jobId }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Check if already bookmarked
      const existing = await BookmarkModel.findOne({
        candidateId: authUser.id,
        jobId,
      });

      if (existing) {
        throw new Error("Job already bookmarked");
      }

      const newBookmark = await BookmarkModel.create({
        candidateId: authUser.id,
        jobId,
      });

      return newBookmark;
    },

    removeBookmark: async (_, { jobId }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      const result = await BookmarkModel.findOneAndDelete({
        candidateId: authUser.id,
        jobId,
      });

      return !!result;
    },
  },
};

export default bookmarkResolvers;
