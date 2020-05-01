import { authorize } from './authorize.middleware';
import { Role } from '@workspace/interfaces';
describe("Authorize",()=>{
    it("should call next when authorize succeed",()=>{
        const req:any = {
            user:{
                role:Role.ADMIN,
            }
        }
        const res:any = {
            
        }
        const middleware = authorize(Role.ADMIN);
        const mockNext = jest.fn().mockImplementation();
        const result = middleware(req,res,mockNext);
        expect(mockNext).toHaveBeenCalledWith();
    });
    it("should return 403 and error when not authorize",()=>{
        const req:any = {
            user:{
                role:Role.ADMIN,
            }
        }
        const res:any = {
            json(document){
                expect(document).toHaveProperty("error");
                expect(document.error).toHaveProperty("message");
                return this;
            },
            status(code){
                expect(code).toBe(403);
                return this;
            }
        }
    });
})