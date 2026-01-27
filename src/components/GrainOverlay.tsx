.grain {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%; /* Over-size to allow for jitter animation without gaps */
  height: 200%;
  background-image: url('/path-to-your-grain.png'); /* Use a tiny tile, not a huge image */
  background-repeat: repeat;
  opacity: 0.035;
  pointer-events: none; /* Critical: Stops the overlay from blocking scroll events */
  z-index: 9999;
  
  /* Hardware Acceleration */
  will-change: transform;
  transform: translateZ(0); 
  
  /* The "Secret Sauce": Noise animation */
  animation: noise 0.2s infinite alternate;
}

@keyframes noise {
  0% { transform: translate(0,0) }
  10% { transform: translate(-1%,-1%) }
  20% { transform: translate(-2%,1%) }
  30% { transform: translate(1%,-2%) }
  40% { transform: translate(-1%,3%) }
  /* ... more random jitter ... */
}
