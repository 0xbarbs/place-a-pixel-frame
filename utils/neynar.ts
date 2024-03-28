import { NeynarUser } from "frog/middlewares";

export const getInteractor = (ctx: { var: { interactor: NeynarUser }}): NeynarUser | null => {
  if (ctx.var.interactor) {
    return ctx.var.interactor as NeynarUser;
  }

  return null;
}