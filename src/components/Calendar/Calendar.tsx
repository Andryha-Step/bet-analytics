import React from 'react'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components/native'
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import month from './calendar.state'

interface Props {}

export const Calendar = observer(({}: Props) => {
	return (
		<Container>
			<MonthContainer>
				<MonthValue />
			</MonthContainer>
			<CalendarContainer>
				<CalendarStrip
					onDateSelected={date => {
						// console.log(date)
					}}
					scrollable
					style={{ height: 53, borderWidth: 0 }}
					shouldAllowFontScaling={false}
					calendarColor={'#111113'}
					// innerStyle={{ padding: 0 }}
					dateNumberStyle={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14 }}
					highlightDateNumberStyle={{ color: 'white', fontFamily: 'Poppins-Medium', fontSize: 14 }}
					highlightDateContainerStyle={{ backgroundColor: '#28292E', borderRadius: 0 }}
					dateNameStyle={{ color: 'white' }}
					showDayName={false}
					showMonth={false}
					scrollToOnSetSelectedDate={false}
					iconContainer={{ width: 0 }}
					iconStyle={{ display: 'none' }}
					selectedDate={moment()}
					onWeekChanged={e => {
						month.setName(moment(e).format('MMMM'))
					}}
					datesWhitelist={[
						{
							start: moment().subtract(12, 'months'),
							end: moment(),
						},
					]}
					maxDate={moment()}
				/>
			</CalendarContainer>
		</Container>
	)
})

const MonthValue = observer(() => {
	return <MonthText>{month.name.toUpperCase()}</MonthText>
})

const Container = styled.View`
	flex-direction: row;
	width: 100%;
	height: 53px;
`
const CalendarContainer = styled.View`
	flex: 1;
`
const MonthContainer = styled.View`
	width: 24px;
	height: 53px;
	justify-content: center;
	align-items: center;
	background-color: #19191c;
`
const MonthText = styled.Text`
	color: #7f7f89;
	font-family: Poppins-Medium;
	font-size: 11px;
	transform: rotate(-90deg);
	width: 53px;
	text-align: center;
`
