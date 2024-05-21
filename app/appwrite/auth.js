import Config from "../config/Config";
import { Client, Account, ID } from "appwrite";


class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(Config.appwriteUrl) // Your API Endpoint
            .setProject(Config.appwriteProjectId); // Your project ID

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //calling login method to login.
                return await this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error is ",error.message);
        }
        return false;
    }

    async logout() {
        try {
          await this.account.deleteSessions()
          return "Logged out successfully!"
        } catch (error) {
            console.log("Appwrite service :: logout :: error ",error.message)
        }
    }
}

const authService = new AuthService();

export default authService;