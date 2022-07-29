import { Container, Box } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getGroupDetailsService } from "../../../services/groupServices"
import AlertBanner from "../../AlertBanner"
import Loading from "../../loading"
import 'chart.js/auto'
import { Bar } from "react-chartjs-2"
import useResponsive from "../../../theme/hooks/useResponsive"


const UserBalanceChart = () => {
    const params = useParams();
    const mdUp = useResponsive('up', 'md');
    const [loading, setLoading] = useState(false)
    const [graphData, setGraphData] = useState([])
    const [graphLabel, setGraphLabel] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState()


    const data = {
        labels: graphLabel,
        datasets: [
            {
                label: 'User Balance',
                data: graphData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    }

    const options = {
        scales: {
            x: {
                ticks: {
                    display: mdUp
                },
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        }
    }

    useEffect(() => {
        const getGroupDetails = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.groupId
            }
            const response_group = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
            let split = Object.entries(response_group?.data?.group?.split[0])
            split.map((mySplit, index) => {
                if (mySplit[1] < 0) {
                    if (index === 0) {
                         setGraphData([Math.abs(mySplit[1])])
                         setGraphLabel([ mySplit[0]])
                    } else {
                        setGraphData(current => [...current, Math.abs(mySplit[1])])
                        setGraphLabel(current => [...current, mySplit[0]])
                    }
                }

            })
            setLoading(false)
        }
        getGroupDetails()
    }, [])

    return (
        <>
            {loading ? <Loading /> :
                <Container sx={{ my: 6 }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity={'error'} />
                    <Box height={350} my={2}>
                        <Bar data={data} options={options} />
                    </Box>
                </Container>}
        </>
    )
}

export default UserBalanceChart