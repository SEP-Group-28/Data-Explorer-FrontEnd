// import React, { useEffect, useState } from 'react'
// import { Paper, TableBody, TableCell, TableRow } from '@material-ui/core'
// import useTable from '../components/hooks/useTable'
// import NavBar from '../components/NavBar'
// import Controls from '../components/controls/Controls'

// import { useDispatch, useSelector } from 'react-redux'
// import { removeFromWatchlist, viewWatchlist } from '../redux/ducks/watchlist'

// import FullPageLoader from '../components/Loading/FullPageLoader'
// import Fade from 'react-reveal/Fade'
// import CloseIcon from '@material-ui/icons/Close'
// import { LISTEN_URL } from '../utils/CONSTANTS'
// import ConfirmDialog from '../components/controls/ConfirmDialog'
// import { openPopUp } from '../redux/ducks/notifications'

// const headCells = [
//   //   { id: 'no', label: 'No', disableSorting: true },
//   { id: 'symbol', label: 'Symbol' },
//   { id: 'price', label: 'Price ($)' },
//   { id: 'high', label: 'High' },
//   { id: 'low', label: 'Low' },
//   { id: 'volume', label: 'Volume' },
//   { id: 'actions', label: 'Actions', disableSorting: true }
// ]

const WatchList = () => {
  // const dispatch = useDispatch()
  // const [eventSources, setEventSources] = useState([])
  // const [records, setRecords] = useState([])
  // const [records1, setRecords1] = useState(new Map())
  // const [highVal, setHighVal] = useState(0)
  // const token = useSelector(state => state.auth.token)
  // let brands = useSelector(state => state.watchlist.brands)
  // const isLoading = useSelector(state => state.watchlist.isLoading)
  // const [tableLoading, setTableLoading] = useState(true)

  // useEffect(() => {
  //   dispatch(viewWatchlist(token))
  // }, [])

  // useEffect(() => {
  //   let eventSource = null
  //   if (brands !== null) {
  //     for (let i in brands) {
  //       if (brands.hasOwnProperty(i)) {
  //         eventSource = new EventSource(LISTEN_URL + brands[i] + '/1d')
  //         eventSource.addEventListener(
  //           'message',
  //           function (e) {
  //             let parsedData = JSON.parse(e.data)
  //             let object = {
  //               id: i,
  //               symbol: brands[i],
  //               price: parseFloat(parsedData.k.c).toFixed(4),
  //               high: parseFloat(parsedData.k.h).toFixed(4),
  //               low: parseFloat(parsedData.k.l).toFixed(4),
  //               volume: parseFloat(parsedData.k.v).toFixed(4)
  //             }
  //             setHighVal(parsedData.k.h)
  //             let tempRecords = records1
  //             tempRecords.set(brands[i], object)
  //             setRecords1(tempRecords)
  //           },
  //           false
  //         )

  //         let tempEventSources = eventSources
  //         tempEventSources.push(eventSource)
  //         setEventSources(tempEventSources)
  //       }
  //     }
  //   }
  //   return () => {
  //     if (eventSources.length !== 0) {
  //       console.log(eventSources)
  //       for (let e in eventSources) {
  //         eventSources[e].close()
  //         console.log('event source closed')
  //       }
  //       setEventSources([])
  //     }
  //   }
  // }, [brands])

  // useEffect(() => {
  //   if (brands !== null && records1.size >= brands.length) {
  //     let temp = []
  //     for (let i in brands) {
  //       if (brands.hasOwnProperty(i)) {
  //         temp.push(records1.get(brands[i]))
  //       }
  //     }
  //     setRecords(temp)
  //     setTableLoading(false)
  //   }
  // }, [highVal])

  // const [filterFn, setFilterFn] = useState({
  //   fn: items => {
  //     return items
  //   }
  // })

  // const {
  //   TblContainer,
  //   TblHead,
  //   TblPagination,
  //   recordsAfterPagingAndSorting
  // } = useTable(records, headCells, filterFn)

  // const handleDelete = symbol => {
  //   dispatch(removeFromWatchlist({ token: token, brands: symbol }))
  //   let tempRecords1 = records1
  //   tempRecords1.delete(symbol)
  //   setRecords1(tempRecords1)
  // }

  // return (
  //   <div>
  //     <Fade top>
  //       <NavBar />
  //     </Fade>

  //     {isLoading || tableLoading ? (
  //       <FullPageLoader />
  //     ) : brands && brands.length < 1 ? (
  //       <h1>No items currently in your Watch List</h1>
  //     ) : (
  //       <Paper>
  //         <TblContainer>
  //           <TblHead />
  //           <TableBody>
  //             {recordsAfterPagingAndSorting().map(item => (
  //               <TableRow key={item.id}>
  //                 {/* <TableCell>{item.id}</TableCell> */}
  //                 <TableCell>{item.symbol}</TableCell>
  //                 <TableCell>{item.price}</TableCell>
  //                 <TableCell>{item.high}</TableCell>
  //                 <TableCell>{item.low}</TableCell>
  //                 <TableCell>{item.volume}</TableCell>
  //                 <TableCell>
  //                   <Controls.ActionButton
  //                     color='secondary'
  //                     // onClick={() => handleDelete(item.symbol)
  //                     // }
  //                     onClick={() =>
  //                       dispatch(
  //                         openPopUp({
  //                           isOpen: true,
  //                           title: 'Are you sure you want to delete this item!',
  //                           subTitle:
  //                             'This item will be deleted from the Watch List...!',
  //                           item,
  //                           handleDelete
  //                         })
  //                       )
  //                     }
  //                   >
  //                     <CloseIcon fontSize='small' />
  //                   </Controls.ActionButton>
  //                 </TableCell>
  //               </TableRow>
  //             ))}
  //           </TableBody>
  //         </TblContainer>
  //       </Paper>
  //     )}
  //     <ConfirmDialog handleDelete={handleDelete} />
  //   </div>
  // )
}

export default WatchList
