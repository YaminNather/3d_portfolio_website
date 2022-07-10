import { FC } from "react";
import { Background } from "./Background/Background";

export const HomePage: FC = function(props) {
    return (        
        <div style={{height: "100vh", width: "100vw"}}>
            <Background />
        </div>
    );
};