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
    const endX= roadWidth- carWidth- 130;
    const valueRect= document.getElementById("valueText").getBoundingClientRect();
    const letterOffsets= letters.map((l)=> l.offsetLeft);
    letters.forEach((l)=> (l.style.opacity= 0));

    gsap.to(car, {
      scrollTrigger: {
        trigger: ".section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".track",
      },
      x: endX,
      ease: "none",
      onUpdate: ()=> {
        const carX= gsap.getProperty(car, "x") + carWidth/2;
        letters.forEach((letter, i)=> {
          const letterX= valueRect.left + letterOffsets[i];
          letter.style.opacity= carX >= letterX ? 1 : 0;
        });
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
    <div className="section">
      <div className="track">
        <div className="road">
          <img src="/car.png" className="car" ref={carRef} alt="car"/>
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

        <div className="text-box" id="box1">
          <span className="num-box">58%</span> Increase in engagement
        </div>

        <div className="text-box" id="box2">
          <span className="num-box">23%</span> Reduced bounce rate
        </div>

        <div className="text-box" id="box3">
          <span className="num-box">27%</span> More conversions
        </div>

        <div className="text-box" id="box4">
          <span className="num-box">40%</span> Faster interactions
        </div>
      </div>
    </div>
  );
}