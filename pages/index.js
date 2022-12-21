import Form from '../components/Form'
import Result from '../components/Result'
import { Container } from 'react-bootstrap'
import { useAtom } from 'jotai';
import { warningAtom, labelsAtom, amountDataAtom, contributionDataAtom, interestDataAtom } from '../store';
import { Alert } from 'react-bootstrap';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
Chart.register(...registerables);
import 'mdbreact/dist/css/mdb.css';

export default function Home() {
  const [warning, setWarning] = useAtom(warningAtom);
  const [chartLabels, setChartLabels] = useAtom(labelsAtom);
  const [amountData, setAmountData] = useAtom(amountDataAtom);
  const [contributionData, setContributionData] = useAtom(contributionDataAtom);
  const [interestData, setInterestData] = useAtom(interestDataAtom);


  const lineData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Balance",
        data: amountData,
        fill: false,
        backgroundColor: "rgba(6, 156,51, .3)",
        borderColor: "#02b844"
      },
      {
        label: "Contributions",
        data: contributionData,
        fill: false,
        backgroundColor: "rgba(0, 137, 132, .2)",
        borderColor: "rgba(50, 150, 255, 1)"
      },
      {
        label: "Interest",
        data: interestData,
        fill: false,
        backgroundColor: "#e697d9",
        borderColor: "#a83295"
      }
    ]
  }

  return (
    <Container>
      <table>
        <tbody>
          <tr>
            <td valign='top'>
              <Form />
            </td>
            <td width={'10%'}></td>
            <td valign='top'  >
              {warning ? (<><br /><Alert variant="danger">{warning}</Alert></>) : (<><h2>Results</h2><Result /></>)}
            </td>
          </tr>
        </tbody>
      </table>
      <MDBContainer style={{ width: '50%' }}>
        <Line data={lineData} />
      </MDBContainer>
    </Container>
  )
}
