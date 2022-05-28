import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { googleProvider } from "src/firebase";
import Router from "next/router";
import axios from "axios";

const Home: React.FC = () => {
    // const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const auth = getAuth();

    onAuthStateChanged(auth, (res) => {
        setLoading(false);
        if (res) {
            if (process.browser) {
                axios.post("/api/createUser", {
                    email: res.email,
                });

                Router.push("/draw");
            }
        }
    });

    const login = () => {
        signInWithPopup(auth, googleProvider)
            .then(({ user }) => {
                if (user) {
                    if (process.browser) {
                        //Runs only on client side

                        Router.push("/draw");
                    }
                }
            })
            .catch((e: any) => {
                console.log(e);
            });
    };

    return (
        <Flex minH="100vh" justify="center" align="center">
            <Button isLoading={loading} maxW="200px" onClick={login}>
                Login with Google
            </Button>
        </Flex>
    );
};

export default Home;
