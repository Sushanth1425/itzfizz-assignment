import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const carRef= useRef(null);
  const trailRef= useRef(null);
  const lettersRef= useRef([]);

  useEffect(()=> {
    const car= carRef.current;
    const trail= trailRef.current;
    const letters= lettersRef.current;
    const roadWidth= car.parentElement.offsetWidth;
    const carWidth= car.offsetWidth;
    const endX= roadWidth- carWidth+ 900;
    letters.forEach((l)=> (l.style.opacity= 0));

    gsap.to(car, {
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: "+=2500",
        scrub: true,
        pin: ".track"
      },
      x: endX,
      ease: "none",
      onUpdate: ()=> {
        const carRect = car.getBoundingClientRect();
        letters.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();

        if (carRect.right >= letterRect.left+ 200) {
          letter.style.opacity = 1;
        } else {
          letter.style.opacity = 0;
          }
        });

        const carX = gsap.getProperty(car, "x") + carWidth / 2;
        gsap.set(trail, { width: carX });
      },
    });

    ["#box1", "#box2", "#box3", "#box4"].forEach((id, i)=> {
      gsap.to(id, {
        scrollTrigger: {
          trigger: ".section",
          start: `top+=${350 + i * 180} top`,
          end: `top+=${550 + i * 180} top`,
          scrub: true,
        },
        opacity: 1,
        y: 0,
      });
    });
  }, []);

  const text= ["WELCOME", "ITZFIZZ"];

  return (
    <div className="section h-[300vh] bg-[#c1bbbb] text-white overflow-x-hidden">
      <div className="track top-0 h-screen flex items-center justify-center">
        <div className="road w-full h-[200px] bg-black relative overflow-hidden">
          <img src="/itzfizz-assignment/car.png" className="car" ref={carRef} alt="car"/>
          <div className="trail" ref={trailRef}></div>
          <div className="value-add" id="valueText">
            {text.map((word, wi)=> (
              <span key={wi} className="word">
                {word.split("").map((char, i)=> (
                  <span key={i} ref={(el)=> (lettersRef.current[wi * 10 + i]= el)} className="value-letter">{char}</span>
                ))} 
              </span>
            ))}
          </div>
        </div>

        <div className="text-box bg-green-500 border-green-400 hover:bg-green-500 hover:scale-105 transition-all duration-300" id="box1">
          <span className="num-box">58%</span> Increase in engagement
        </div>

        <div className="text-box bg-blue-500 border-blue-400 hover:bg-blue-500 hover:scale-105 transition-all duration-300" id="box2">
          <span className="num-box">23%</span> Reduced bounce rate
        </div>

        <div className="text-box bg-red-500 border-purple-400 hover:bg-red-500 hover:scale-105 transition-all duration-300" id="box3">
          <span className="num-box">27%</span> More conversions
        </div>

        <div className="text-box bg-yellow-500 border-yellow-400 hover:bg-yellow-500 hover:scale-105 transition-all duration-300" id="box4">
          <span className="num-box">40%</span> Faster interactions
        </div>
      </div>
    </div>
  );
}