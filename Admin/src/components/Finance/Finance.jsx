/* eslint-disable react/jsx-pascal-case */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FileDownload from 'js-file-download';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { downloadXLSFile } from '../../app/ApiResult';
import TableFinance from '../Table/TableBill/TableFinance';
import { GetRevenueByDay } from './../../app/ApiResult';
import './styles.scss';
function Finace() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [select, setSelect] = useState(1);
	const [ok, setOk] = useState(0);
	const [date, setDate] = useState(new Date());
	const [exportLink, setExportLink] = useState(
		`/billex/revenue/date/${
			date.getMonth() + 1
		}-${date.getDate()}-${date.getFullYear()}`
	);
	const { enqueueSnackbar } = useSnackbar();
	const [paginate, setPaginate] = useState({
		page: 1,
		size: 10,
		count: 0,
	});
	const ListTitleHead1 = [
		{ Name: 'Mã số' },
		{ Name: 'Giờ' },
		{ Name: 'Doanh thu' },
		{ Name: 'Phương thức' },
	];
	const ListTitleHead2 = [
		{ Name: 'Ngày' },
		{ Name: 'Số lượng' },
		{ Name: 'Tổng Doanh thu' },
	];
	const ListTitleHead3 = [
		{ Name: 'Tháng' },
		{ Name: 'Số hóa đơn' },
		{ Name: 'Doanh thu' },
	];
	const [head, setHead] = useState(ListTitleHead1);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const exportData = async () => {
		const response = await downloadXLSFile(exportLink);
		if (response?.status === 200) {
			FileDownload(response?.data, 'Doanh thu CoffeeBook.xlsx');
		} else {
			enqueueSnackbar('Hiện chưa có dữ liệu', { variant: 'warning' });
		}
	};

	useEffect(() => {
		switch (Number(select)) {
			case 1: {
				setExportLink(
					`/billex/revenue/date/${
						date.getMonth() + 1
					}-${date.getDate()}-${date.getFullYear()}`
				);
				const link = `/bill/sales/date/${
					date.getMonth() + 1
				}-${date.getDate()}-${date.getFullYear()}`;
				getData(link);
				setHead(ListTitleHead1);
				setOk(1);
				break;
			}

			case 2: {
				setExportLink(
					`/billex/revenue/month/${date.getMonth() + 1}-${date.getFullYear()}`
				);
				const link = `/bill/sales/months/${
					date.getMonth() + 1
				}-${date.getFullYear()}`;
				getData(link);
				setHead(ListTitleHead2);
				setOk(0);
				break;
			}
			case 3: {
				setExportLink(`/billex/revenue/year/${date.getFullYear()}`);
				const link = `/bill/sales/years/${date.getFullYear()}`;
				getData(link);
				setHead(ListTitleHead3);
				setOk(0);
				break;
			}
			default:
				break;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [select, date]);
	const OnchangeType = (e) => {
		setSelect(e.target.value);
	};

	const getData = async (link) => {
		const res = await GetRevenueByDay(paginate, link);
		setData(res?.data);
		setPaginate({
			...paginate,
			count: res?.totalPages,
		});
		setLoading(true);
	};

	return (
		<>
			{loading ? (
				<>
					{' '}
					<div className='Export-nav'>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label='Thời gian'
								value={date}
								onChange={(newValue) => {
									setDate(newValue);
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>

						<FormControl sx={{ m: 1, minWidth: 120, marginTop: 0 }}>
							<select
								className='form-control selectDate '
								name='ManagerId'
								color='warning'
								value={select}
								onChange={(e) => OnchangeType(e)}>
								<option value={1}>Theo Ngày</option>
								<option value={2}>Theo Tháng</option>
								<option value={3}>Theo Năm</option>
							</select>
						</FormControl>

						<button onClick={exportData} className='btn btn-success'>
							{' '}
							Xuất Excel
						</button>
					</div>
					<TableFinance
						List={data}
						ListTitleHead={head}
						ok={ok}
						paginate={paginate}
						setPaginate={setPaginate}
					/>
				</>
			) : (
				<div className='spinner-border text-success' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			)}
		</>
	);
}

export default Finace;
