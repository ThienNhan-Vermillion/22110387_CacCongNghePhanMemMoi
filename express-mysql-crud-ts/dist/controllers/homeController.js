"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.postUpdateUser = exports.getEditUser = exports.getUsers = exports.postCreateUser = exports.getHome = void 0;
const CRUDService_1 = __importDefault(require("../services/CRUDService"));
const getHome = (req, res) => {
    res.render('home.ejs');
};
exports.getHome = getHome;
const postCreateUser = async (req, res) => {
    try {
        console.log('Received form data:', req.body);
        await CRUDService_1.default.createUser(req.body);
        console.log('User created successfully');
        res.redirect('/users');
    }
    catch (error) {
        console.error('Error creating user:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send('Error creating user: ' + errorMessage);
    }
};
exports.postCreateUser = postCreateUser;
const getUsers = async (req, res) => {
    try {
        const users = await CRUDService_1.default.getAllUsers();
        res.render('users/list.ejs', { users });
    }
    catch (error) {
        console.error('Error getting users:', error);
        res.status(500).send('Error getting users');
    }
};
exports.getUsers = getUsers;
const getEditUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id || '0');
        const user = await CRUDService_1.default.getUserById(userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('users/edit.ejs', { user });
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).send('Error getting user');
    }
};
exports.getEditUser = getEditUser;
const postUpdateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id || '0');
        await CRUDService_1.default.updateUser(userId, req.body);
        res.redirect('/users');
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};
exports.postUpdateUser = postUpdateUser;
const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id || '0');
        const deleted = await CRUDService_1.default.deleteUser(userId);
        if (!deleted) {
            res.status(404).send('User not found');
            return;
        }
        res.redirect('/users');
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=homeController.js.map