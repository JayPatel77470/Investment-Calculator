import Form from '../components/Form'
import Result from '../components/Result'
import { Container } from 'react-bootstrap'
import { useAtom } from 'jotai';
import { warningAtom } from '../store';
import { Alert } from 'react-bootstrap';

export default function Home() {
  const [warning, setWarning] = useAtom(warningAtom);
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
    </Container>
  )
}
