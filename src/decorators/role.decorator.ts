/* eslint-disable prettier/prettier */
import { SetMetadata } from "@nestjs/common";
import { Role } from "src/domains/user/schemas/role.enum";

export const ROLES_KEY = 'roles';
// just here i check if role in enum i set or not
// setMetadata saving data  
export const Roles = (...roles:Role[])=> SetMetadata(ROLES_KEY, roles)