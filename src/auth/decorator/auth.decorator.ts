import { applyDecorators, UseGuards } from "@nestjs/common";
import {Role} from '../enum/rol.enum';
import { Roles } from "./role.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RoleGuard } from "../guard/role.guard";

export function Auth(role: Role) {
    return applyDecorators(Roles(role), UseGuards(AuthGuard, RoleGuard))
}