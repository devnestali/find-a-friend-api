import type { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { sub } = request.user;

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub,
        expiresIn: "7d",
      },
    },
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({
      token,
    });
}
