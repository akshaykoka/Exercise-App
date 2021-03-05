const Users = [
    { Name: 'AKSHAY', Password: '1995', Email: 'akshay@gmail.com' },
    { Name: 'koka', Password: '1234', Email: 'kokaa2@hawkmail.newpaltz.edu' },
];

export let CurrentUser = null;

export function Login(email, password) {

    const user = Users.find(x => x.Email == email);
    if(!user) throw Error('User not found');
    if(user.Password != password) throw Error('Wrong Password');

    return CurrentUser = user;
}