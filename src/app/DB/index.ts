import config from '../config';
import { USER_ROLE } from '../constant';
import { User } from '../modules/User/user.model';

const superUser = {
  email: config.super_admin_email,
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.SUPER_ADMIN,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.SUPER_ADMIN });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
