import { Request, Response } from 'express';
import CRUDService from '../services/CRUDService';

// Trang home (form tạo user)
export const getHome = (req: Request, res: Response): void => {
  res.render('home.ejs');
};

// Tạo user mới
export const postCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received form data:', req.body);
    await CRUDService.createUser(req.body);
    console.log('User created successfully');
    res.redirect('/users');
  } catch (error) {
    console.error('Error creating user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).send('Error creating user: ' + errorMessage);
  }
};

// Lấy danh sách user
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await CRUDService.getAllUsers();
    res.render('users/list.ejs', { users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Error getting users');
  }
};

// Lấy form edit user
export const getEditUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id || '0');
    const user = await CRUDService.getUserById(userId);
    
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.render('users/edit.ejs', { user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send('Error getting user');
  }
};

// Cập nhật user
export const postUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id || '0');
    await CRUDService.updateUser(userId, req.body);
    res.redirect('/users');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Error updating user');
  }
};

// Xóa user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id || '0');
    const deleted = await CRUDService.deleteUser(userId);
    
    if (!deleted) {
      res.status(404).send('User not found');
      return;
    }
    
    res.redirect('/users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};
