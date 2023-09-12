import {ReactNode} from "react";
import {Box} from "@mui/material";

export interface BalanceBackgroundProps {
    uuid: string
    children: ReactNode
}

const BalanceBackground = ({uuid, children}: BalanceBackgroundProps) => {
    return (
        <Box sx={{
            backgroundImage: `url(http://localhost:8080/api/attachment/${uuid})`,
            height: "100%",
            position: "absolute",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            {children}
        </Box>

    )
}

export default BalanceBackground