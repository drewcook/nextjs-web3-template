'use client'
import { grey } from '@mui/material/colors'
import { createTheme, ThemeOptions } from '@mui/material/styles'

const themeOptions: ThemeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#20feff',
		},
		secondary: {
			main: '#9c75ff',
		},
		text: {
			primary: '#ffffff',
			secondary: 'rgba(255,255,255,0.7)',
			disabled: 'rgba(255,255,255,0.4)',
			// hint: '#c9c9ff',
		},
		background: {
			default: '#000404',
			paper: grey[900],
		},
		error: {
			main: '#fb1870',
		},
		warning: {
			main: '#ff9131',
		},
		info: {
			main: '#5e82ea',
		},
		success: {
			main: '#38ff65',
		},
		divider: 'rgba(103,103,103,0.7)',
	},
}

const muiTheme = createTheme(themeOptions)

export default muiTheme
