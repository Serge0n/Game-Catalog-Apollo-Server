const users = [
  {
    id: "1",
    token: 'first-token',
    name: "First",
    email: 'first@first.com',
    password: 'First',
  },
]

const getUserByToken = (token: string) => users.find((user) => user.token === token)

export {
  getUserByToken
}