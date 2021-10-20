import React from "react"

export { default as burger } from './Group 21@2x.png'
export { default as sourceCode } from './sourcecode.jpg'

const blackLogo = <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.7 37.89"><title>Untitled-1 [Recovered]</title><path d="M37.44,439.71v-36H66.17v8.62H49v4.79H63.51v8.25H49V431h17.9v8.74Z" transform="translate(-37.44 -402.82)" fill="#231f20"/><path d="M70.44,431v-9.4H83V431Z" transform="translate(-37.44 -402.82)" fill="#231f20"/><path d="M112.22,425.77h10.94q-.49,7.1-5,11t-12.23,3.92q-8.64,0-13.6-5.07t-5-13.88q0-8.79,4.91-13.87t13.38-5.08q7.81,0,12.29,3.77t5,10.78H111.9a5.49,5.49,0,0,0-6.1-5.57,5.76,5.76,0,0,0-5.09,2.48q-1.7,2.48-1.7,7.48t1.81,7.42a6.11,6.11,0,0,0,5.3,2.51,5.84,5.84,0,0,0,4.26-1.54A6.8,6.8,0,0,0,112.22,425.77Z" transform="translate(-37.44 -402.82)" fill="#231f20"/><path d="M126.06,426.4q0-6.59,4-10.39t11-3.8q7,0,11,3.8t4,10.39q0,6.64-4,10.45t-11,3.81q-7,0-11-3.81T126.06,426.4Zm10.67,0a10.37,10.37,0,0,0,1,5.3,3.63,3.63,0,0,0,3.33,1.61,3.68,3.68,0,0,0,3.36-1.62,10.18,10.18,0,0,0,1-5.29,10,10,0,0,0-1-5.24,3.7,3.7,0,0,0-3.36-1.6,3.65,3.65,0,0,0-3.33,1.59Q136.73,422.74,136.73,426.4Z" transform="translate(-37.44 -402.82)" fill="#231f20"/><path d="M160.38,439.71V413.17H170v3.88a11.58,11.58,0,0,1,4-3.47,11,11,0,0,1,5.05-1.12,8.82,8.82,0,0,1,4.5,1.1,10,10,0,0,1,3.38,3.49,12.6,12.6,0,0,1,4.22-3.52,11.62,11.62,0,0,1,5.18-1.12q4.69,0,7.28,2.42a8.83,8.83,0,0,1,2.59,6.79v18.09h-10.4V425.5a6.09,6.09,0,0,0-.84-3.61,3.18,3.18,0,0,0-2.72-1.12,3.35,3.35,0,0,0-2.83,1.17,6,6,0,0,0-.9,3.66v14.11H178.08V425.87a6.79,6.79,0,0,0-.87-3.92,3.29,3.29,0,0,0-2.84-1.18,3.16,3.16,0,0,0-2.67,1.2,5.67,5.67,0,0,0-.92,3.49v14.26Z" transform="translate(-37.44 -402.82)" fill="#231f20"/></svg>

const whiteLogo = <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168.7 37.89"><title>Untitled-1 [Recovered]</title><path d="M37.44,439.71v-36H66.17v8.62H49v4.79H63.51v8.25H49V431h17.9v8.74Z" transform="translate(-37.44 -402.82)" fill="#fff"/><path d="M70.44,431v-9.4H83V431Z" transform="translate(-37.44 -402.82)" fill="#fff"/><path d="M112.22,425.77h10.94q-.49,7.1-5,11t-12.23,3.92q-8.64,0-13.6-5.07t-5-13.88q0-8.79,4.91-13.87t13.38-5.08q7.81,0,12.29,3.77t5,10.78H111.9a5.49,5.49,0,0,0-6.1-5.57,5.76,5.76,0,0,0-5.09,2.48q-1.7,2.48-1.7,7.48t1.81,7.42a6.11,6.11,0,0,0,5.3,2.51,5.84,5.84,0,0,0,4.26-1.54A6.8,6.8,0,0,0,112.22,425.77Z" transform="translate(-37.44 -402.82)" fill="#fff"/><path d="M126.06,426.4q0-6.59,4-10.39t11-3.8q7,0,11,3.8t4,10.39q0,6.64-4,10.45t-11,3.81q-7,0-11-3.81T126.06,426.4Zm10.67,0a10.37,10.37,0,0,0,1,5.3,3.63,3.63,0,0,0,3.33,1.61,3.68,3.68,0,0,0,3.36-1.62,10.18,10.18,0,0,0,1-5.29,10,10,0,0,0-1-5.24,3.7,3.7,0,0,0-3.36-1.6,3.65,3.65,0,0,0-3.33,1.59Q136.73,422.74,136.73,426.4Z" transform="translate(-37.44 -402.82)" fill="#fff"/><path d="M160.38,439.71V413.17H170v3.88a11.58,11.58,0,0,1,4-3.47,11,11,0,0,1,5.05-1.12,8.82,8.82,0,0,1,4.5,1.1,10,10,0,0,1,3.38,3.49,12.6,12.6,0,0,1,4.22-3.52,11.62,11.62,0,0,1,5.18-1.12q4.69,0,7.28,2.42a8.83,8.83,0,0,1,2.59,6.79v18.09h-10.4V425.5a6.09,6.09,0,0,0-.84-3.61,3.18,3.18,0,0,0-2.72-1.12,3.35,3.35,0,0,0-2.83,1.17,6,6,0,0,0-.9,3.66v14.11H178.08V425.87a6.79,6.79,0,0,0-.87-3.92,3.29,3.29,0,0,0-2.84-1.18,3.16,3.16,0,0,0-2.67,1.2,5.67,5.67,0,0,0-.92,3.49v14.26Z" transform="translate(-37.44 -402.82)" fill="#fff"/></svg>

const smollArrow = <svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.27 90.41"><title>arrow-pointing-up-svgrepo-com</title><path d="M128.29,110.84a3,3,0,0,1-2.38-1.18L65.63,30.3,5.36,109.65a3,3,0,0,1-4.75-3.6l65-85.62,65,85.62a3,3,0,0,1-.57,4.18A2.94,2.94,0,0,1,128.29,110.84Z" transform="translate(0 -20.43)" fill="#010002"/></svg>

export { blackLogo, whiteLogo, smollArrow }