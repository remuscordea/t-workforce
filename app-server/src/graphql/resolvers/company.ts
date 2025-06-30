import { IResolvers } from "@graphql-tools/utils";
import slugify from "slugify";
import CompanyModel from "../../models/Company";
import { requireAuth } from "../../utils/auth";
import {
  updateCompanySchema,
  createCompanySchema,
  CreateCompanyInput,
  UpdateCompanyInput,
} from "../../validators/company";
import { validateAgainstSchema } from "../../utils/validation";

const companyResolvers: IResolvers = {
  Query: {
    myCompany: async (_, __, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      const company = await CompanyModel.findOne({ user: authUser.id });
      if (!company) {
        throw new Error("No company found for this user");
      }

      return company;
    },

    getCompanyBySlug: async (_, { slug }) => {
      const company = await CompanyModel.findOne({ slug });
      if (!company) {
        throw new Error("Company not found");
      }
      return company;
    },
  },

  Mutation: {
    createCompany: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Check if the user already has a company
      const existing = await CompanyModel.findOne({ user: authUser.id });
      if (existing) {
        console.warn("User already has a company");
        throw new Error("User already has a company");
      }

      // Validate the input using the schema
      const parsed = validateAgainstSchema(input, createCompanySchema);
      const validatedInput = parsed.data as CreateCompanyInput;

      const slug = slugify(validatedInput.name, { lower: true });

      const newCompany = new CompanyModel({
        ...validatedInput,
        user: authUser.id,
        slug,
      });

      await newCompany.save();
      return newCompany;
    },

    updateCompany: async (_, { input }, context) => {
      // Ensure the user is authenticated
      const authUser = requireAuth(context.user);

      // Find the company associated with the authenticated user
      const company = await CompanyModel.findOne({ user: authUser.id });
      if (!company) {
        throw new Error("Company not found");
      }

      // Validate input
      const parsed = updateCompanySchema.safeParse(input);
      if (!parsed.success) {
        const errorMessages = parsed.error.errors
          .map((e) => e.message)
          .join(", ");
        console.error("Validation error:", errorMessages);
        throw new Error("Validation error: " + errorMessages);
      }

      const validatedInput = parsed.data as UpdateCompanyInput;

      Object.assign(company, validatedInput);
      if (validatedInput.name) {
        company.slug = slugify(validatedInput.name, { lower: true });
      }

      await company.save();
      return company;
    },
  },
};

export default companyResolvers;
