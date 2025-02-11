import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//devuelve el usuario activo
export const ActiveUser = createParamDecorator( (data: unknown, ctx : ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})
/*  se conecta con el authguard */