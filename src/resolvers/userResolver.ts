export const userResolver = {
  Query: {
    user: async (parent: any, args: any, context: { user: any }) => {
      if (!context.user) return null;
      return context.user
    }
  },
  // Mutation: {
  //   signup: async (parent: any, args: any, context: any) => {

  //   }
  // }
}