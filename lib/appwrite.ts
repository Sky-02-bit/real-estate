// import { avatar } from '@/assets/images/avatar.png';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from "react-native-appwrite";

//WebBrowser.maybeCompleteAuthSession(); 

export const config = {
    Platform: 'com.sky.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}
export const client = new Client();
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.Platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
//  Google login Function

export async function login() {
    try {
        const redirectUri = Linking.createURL('/');
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) {
            throw new Error(
                "Create OAuth2 token failed"
            );
        }
        const browserResult = await WebBrowser.openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== 'success') {
            throw new Error(
                "Create OAuth2 token failed"
            );
        }
        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
        if (!secret || !userId) {
            throw new Error(
                "Create OAuth2 token failed"
            );
        }
        const session = await account.createSession(
            userId,
            secret
        );
        if (!session) {
            throw new Error(
                "Failed to create a session"
            );
        } return true;
    } catch (error) {
        console.error("Login Error", error);
        return false;
    }
}

//  Logout function

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Getting current login user
export async function getCurrentUser() {
    try {
        const response = await account.get();

        if (response.$id) {
            const userAvatar = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(response.name)}&project=${config.projectId}`;

            console.log("AVATAR RESULT:", userAvatar);
            console.log("AVATAR RESULT TYPE:", typeof userAvatar);

            return {
                ...response,
                avatar: userAvatar,
            };
        }

        return null;
    } catch (error) {
        console.error("GET CURRENT USER ERROR:", error);
        return null;
    }
}
// fetch latest property
export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            [
                Query.orderAsc('$createdAt'),
                Query.limit(5),
            ]
        );
        console.log("LATEST PROPERTIES:", result.documents); // show latest property in terminal
        return result.documents;
    } catch (error) {
        console.error("GET LATEST PROPERTIES ERROR:", error);
        return [];
    }
}

export async function getProperties({
    filter,
    query,
    limit,
}: {
    filter: string;
    query: string;
    limit?: number;
}) {
    try {
        const buildQuery = [
            Query.orderDesc('$createdAt'),
        ];

        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('type', filter));
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    Query.search('address', query),
                    Query.search('type', query),
                ])
            );
        }

        if (limit) {
            buildQuery.push(Query.limit(limit));
        }
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesCollectionId!,
            buildQuery,
        )
        return result.documents;
    } catch (error) {
        console.error(error);
        return [];
    }
}