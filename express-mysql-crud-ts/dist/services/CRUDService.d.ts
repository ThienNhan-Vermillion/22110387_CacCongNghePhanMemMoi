import { User, CreateUserData, UpdateUserData } from '../types/user';
declare class CRUDService {
    createUser(data: CreateUserData): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    updateUser(id: number, data: UpdateUserData): Promise<User | null>;
    deleteUser(id: number): Promise<boolean>;
    private mapRowToUser;
}
declare const _default: CRUDService;
export default _default;
//# sourceMappingURL=CRUDService.d.ts.map