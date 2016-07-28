'use strict';
export interface User {
    

    /**
     * Unique identifier of the user.
     */
    userId?: string;

    /**
     * First name of the user.
     */
    firstName?: string;

    /**
     * Last name of the user.
     */
    lastName?: string;

    /**
     * The password of the user as plain text w00t.
     */
    password?: string;

    /**
     * Email address of the user.
     */
    email?: string;
}
