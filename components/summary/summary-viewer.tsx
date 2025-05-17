'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  



const parseSection=(section:string)=>{
    const [title,...content]=section.split('\n');
//removing #
    const cleanTitle=title.startsWith('#')?title.substring(1).trim():title.trim()
    const points:string[]=[];
    let currentPoint=''

    content.forEach(line => {
        const trimmedLine=line.trim();
        if(trimmedLine.startsWith('.')){
            if(currentPoint) points.push(currentPoint.trim());
            currentPoint=''
        }
        else if(!trimmedLine){
            if(currentPoint) points.push(currentPoint.trim());
            currentPoint=''
        }
        else {currentPoint += ' ' +trimmedLine;}
        
    });
    if(currentPoint) points.push(currentPoint.trim());

    return  {title:cleanTitle,points:points.filter((point)=> point && !point.startsWith('#') && !point.startsWith('choose'))};
} 


export default function SummaryViewer({summary}:{summary:string}){
//parsing Summary

const sections=summary.split('\n#').map((section)=>section.trim()).filter(Boolean).map(parseSection);

    return <>
    <div className="container bg-amber-200 p-5 border-e-amber-50 rounded-2xl">
    <Carousel>
  <CarouselContent>
    {sections.map((e,index)=>( <CarouselItem key={index}>
        <div className="mb-2 lg:mb-4 text-2xl bg-amber-300 p-3 border-2 rounded-2xl font-bold">{e.title}</div>
        <div className="text-sm text-gray-700 p-6  ">{e.points}</div>
    </CarouselItem>))}
   
    
  </CarouselContent>
  <CarouselPrevious className="bg-rose-500 text-white " />
  <CarouselNext  className="bg-rose-500 text-white " />
</Carousel>

    </div>
    
    </>
}

