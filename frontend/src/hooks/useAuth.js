import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ACCESS_TOKEN_KEY, LOGGED_IN_USER_KEY } from '../config';

const AuthContext = React.createContext();
/**
 * Grab access token from local storage, or if not found, return false
 * @returns {string|boolean}
 */
function getAccessTokenFromStorage() {
    try {
        const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY));
        if (token === null) {
            return false;
        }
        return token;
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 * Grab user from local storage, or if not found, return false
 * @returns {string|boolean}
 */
function getUserFromStorage() {
    try {
        const user = JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
        if (user === null) {
            return false;
        }
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export function AuthContextProvider({ children }) {
    const [user, setUserInternal] = useState(getUserFromStorage);
    const [accessToken, setAccessTokenInternal] = useState(getAccessTokenFromStorage);

    const setAccessToken = useCallback(
        (newToken, fromLocalStorage = false) => {
            setAccessTokenInternal(newToken);
            // a simple set won't fire a storage call, so we need to fire it manually if that's needed
            if (!fromLocalStorage) {
                if (newToken === false) {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                } else {
                    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(newToken));
                }
            }
        },
        [setAccessTokenInternal]
    );

    const setUser = useCallback(
        (newUser, fromLocalStorage = false) => {
            (() => {
                setUserInternal(
                    newUser === false
                        ? false
                        : {
                              ...newUser,
                          }
                );
                // a simple set won't fire a storage call, so we need to fire it manually if that's needed
                if (!fromLocalStorage) {
                    if (newUser === false) {
                        localStorage.removeItem(LOGGED_IN_USER_KEY);
                    } else {
                        localStorage.setItem(
                            LOGGED_IN_USER_KEY,
                            JSON.stringify({
                                ...newUser,
                            })
                        );
                    }
                }
            })()?.catch((err) => {
                console.log(err);
            });
        },
        [setUserInternal]
    );

    const logoutUser = useCallback(() => {
        setUser(false);
        setAccessToken(false);
    }, [setUser]);

    // listen to localstorage changes, so we can invalidate token from anywhere
    useEffect(() => {
        const checkAccessToken = (e) => {
            if (e.key === ACCESS_TOKEN_KEY) {
                const newToken = getAccessTokenFromStorage();
                if (accessToken === newToken) {
                    return;
                }
                if (newToken === false) {
                    logoutUser();
                } else {
                    setAccessToken(newToken, true);
                }
                return;
            }
            if (e.key === LOGGED_IN_USER_KEY) {
                setUser(getUserFromStorage(), true);
            }
        };

        // this is needed if you have more windows open
        window.addEventListener('storage', checkAccessToken);
        return () => {
            window.removeEventListener('storage', checkAccessToken);
        };
    }, [accessToken, setAccessToken]);

    const contextValue = useMemo(
        () => ({
            user,
            setUser,
            logoutUser,
            setAccessToken,
        }),
        [user, setUser, logoutUser, setAccessToken]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

AuthContext.displayName = 'AuthContext';

/**
 * Auth context
 * @returns {{logoutUser: logoutUser, setUser: setUser, setAccessToken: setAccessToken, user: {}}}
 */
export function useAuth() {
    return useContext(AuthContext);
}
