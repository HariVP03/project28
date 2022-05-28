import { Avatar, Button, Flex, Input } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Router from "next/router";
import { LegacyRef, Suspense, useRef, useState } from "react";
import ReactPainter from "react-painter";
import { storage } from "src/firebase";
import CanvasDraw from "react-canvas-draw";
import axios from "axios";

const Draw: React.FC = () => {
    function dataURLtoBlob(dataurl: any) {
        const arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const canvas = useRef<LegacyRef<CanvasDraw> | undefined>();
    const [paintingName, setPaintingName] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSave = (blob: Blob) => {
        setLoading(true);
        const paintingRef = ref(
            storage,
            `/paintings/${user?.uid}/${paintingName}/${Math.ceil(
                Math.random() * 100000,
            )}/image`,
        );

        uploadBytes(paintingRef, blob)
            .then((snap) => getDownloadURL(snap.ref))
            .then((url) => {
                axios
                    .post("/api/createPainting", {
                        name: paintingName,
                        url,
                        email: auth.currentUser?.email,
                    })
                    .then(() => {
                        setLoading(false);
                    });
            });
    };

    onAuthStateChanged(auth, (res) => {
        if (!res) {
            if (process.browser) {
                //Runs only on client side

                Router.push("/");
            }
        }
    });

    return (
        <Flex bg="gray.800" w="100vw" h="100vh" justify="center" align="center">
            <Flex gap={5} direction="column" align="center">
                <Flex align="center" gap={3}>
                    <Button
                        isLoading={loading}
                        onClick={() => {
                            const r = (canvas.current as any)?.getDataURL(
                                "image/png",
                            );
                            console.log(dataURLtoBlob(r));
                            onSave(dataURLtoBlob(r));
                        }}
                    >
                        Save
                    </Button>
                    <Avatar src={user?.photoURL || ""} />
                </Flex>
                <Input
                    value={paintingName}
                    onChange={(e) => setPaintingName(e.target.value)}
                    color="white"
                    placeholder="Name of the painting"
                />
                <Flex
                    rounded="none"
                    h="500px"
                    w="500px"
                    bg="white"
                    border="2px solid"
                    borderColor="gray.600"
                >
                    <CanvasDraw
                        canvasHeight="500px"
                        canvasWidth="500px"
                        ref={canvas as any}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Draw;
