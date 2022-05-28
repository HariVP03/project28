import { Avatar, Button, Flex, Input } from "@chakra-ui/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPainter from "react-painter";
import { storage } from "src/firebase";

const Draw: React.FC = () => {
    const router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;
    const [paintingName, setPaintingName] = useState<string | undefined>();

    const onSave = (blob: Blob) => {
        const paintingRef = ref(
            storage,
            `/paintings/${user?.uid}/${paintingName}/${Math.ceil(
                Math.random() * 100000,
            )}/image`,
        );
        // const paintingFile = new File([blob], "paintingFile");

        // console.log(paintingFile);

        uploadBytes(paintingRef, blob)
            .then((snap) => getDownloadURL(snap.ref))
            .then((url) => console.log(url));
    };

    onAuthStateChanged(auth, (res) => {
        if (!res) {
            router.push("/");
        }
    });

    return (
        <Flex bg="gray.800" w="100vw" h="100vh" justify="center" align="center">
            <ReactPainter
                width={500}
                height={500}
                onSave={(blob) => {
                    console.log("Started");
                    console.log(blob);
                    onSave(blob);
                    console.log("Ended");
                }}
                render={({ triggerSave, canvas }) => (
                    <Flex gap={5} direction="column" align="center">
                        <Flex align="center" gap={3}>
                            <Button onClick={triggerSave}>Save</Button>
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
                            {canvas}
                        </Flex>
                    </Flex>
                )}
            />
        </Flex>
    );
};

export default Draw;
