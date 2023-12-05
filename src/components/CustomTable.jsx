import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./style/CustomTable.css"
import { useNavigate } from 'react-router-dom';

const CustomTable = ({ data, heads, onClickRowPath }) => {
  const navigate = useNavigate()
  return (
    <div className='custom-table'>

      <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650, border: 'none', backgroundColor: '#F4F7FE' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {heads.map((head, i) => {
                return (
                  <TableCell align={`${head.toLowerCase().includes('id') || head.toLowerCase().includes('delete') ? 'center' : 'left'}`} key={i}>{head}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}>
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <TableCell onClick={() => key !== '_delete' && onClickRowPath && navigate(`${onClickRowPath}/${item.id}`)} key={`${index} ${key}`} align={`${key === 'id' || key.includes('_') ? 'center' : 'left'}`}>{value}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
 
export default CustomTable