import { createToken, decodeToken } from '../helpers/jwtHelper';
import JwtPayload from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // const user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //   },
    // });

    // if (!user) {
    //   next({
    //     code: 404,
    //     message: 'Invalid email or password',
    //   });
    // } else {
    //   const isMatch = compareSync(password, user.password);
    //   if (!isMatch) {
    //     return next({
    //       message: 'Invalid email or password',
    //       code: 404,
    //     });
    //   }

    //   const authUser = await prisma.user.findUnique({
    //     where: {
    //       id: user.id,
    //     },
    //     include: {
    //       userGroup: {
    //         include: {
    //           group: {
    //             include: {
    //               groupPrivileges: true,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   });

    //   if (authUser?.isSuspended) {
    //     return next({
    //       message: 'Account is suspended',
    //       code: 401,
    //     });
    //   }

    //   const groups: any[] = [];
    //   const privileges: any[] = [];

    //   authUser?.userGroup.map(({ group }) => {
    //     groups.push({ id: group.id, name: group.name, level: group.level });
    //     group.groupPrivileges.map(
    //       (groupPrivilege) =>
    //         privileges.findIndex(
    //           (privilege: any) => privilege === groupPrivilege.privilegeId
    //         ) === -1 && privileges.push(groupPrivilege.privilegeId)
    //     );
    //   });

    //   const token = createToken({
    //     ...authUser,
    //     group: groups,
    //     privileges,
    //   });

    //   const decoded = decodeToken(token);

    //   await prisma.accessHistory.create({
    //     data: {
    //       userId: user.id,
    //       description: 'login',
    //     },
    //   });

    //   const userdata: any = authUser;
    //   delete userdata.userGroup;

    //   return res.status(200).json({
    //     message: 'Log in successfully',
    //     data: {
    //       token,
    //       iat: (decoded as JwtPayload).iat,
    //       exp: (decoded as JwtPayload).exp,
    //       userId: user.id,
    //       privileges,
    //       user: userdata,
    //     },
    //   });
    // }
  } catch (error) {
    next({
      message: 'Internal server error',
      details: error,
      code: 500,
    });
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      message: 'Log out successfully',
    });
    return
  } catch (error) {
    console.log('error', error);
    next({
      message: 'Internal server error',
      details: error,
      code: 500,
    });
  }
};
