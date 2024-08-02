'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {Draggable, DropArg} from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import {EventSourceInput} from '@fullcalendar/core/index.js'
import {useEffect, useRef, useState} from 'react'
import React from 'react'

export default function Calendar() {
    const calendarRef = useRef<HTMLDivElement>(null)
    const [allEvents, setAllEvents] = useState<Event[]>([])

    let v1 = 0
    //Styling the calendar
    //To avoid div width changes after click on month buttons
    useEffect(() => {
        const titleToModify = document.getElementsByClassName("fc-toolbar-chunk") as HTMLCollectionOf<HTMLElement>
        const titleToModifyChild = document.getElementsByClassName("fc-toolbar-title").item(0) as HTMLElement

        //            Working
        //            Changing approach for responsive behaviour. Choosing button previous as reference for height
        //            fc-button-group, fc-prev-button. To set size to fc-toolbar-chunk; array 1 in fc-header-toolbar

        const heightRefDiv = titleToModify.item(0)
        const selectChildHeighRef = heightRefDiv!.firstChild as Element

//            Button group width
//            const newWidthAfterMount =titleToModify.item(0).firstChild!.clientWidth
//            Init title width
        const newWidthAfterMount = titleToModify.item(1)!.clientWidth
//            const newHeightAfterMount =Math.ceil(titleToModify.item(0).firstChild.getBoundingClientRect().height)
//                TS2339: Property 'getBoundingClientRect' does not exist on type 'ChildNode'.

        const newHeightAfterMount = Math.ceil(selectChildHeighRef.getBoundingClientRect().height)
        titleToModify.item(1)!.style.width = newWidthAfterMount + "px"
        titleToModify.item(1)!.style.height = newHeightAfterMount + "px"

        const echild = document.querySelector('.fc-toolbar-title')

        let htitle = titleToModifyChild
        let parent01 = titleToModify.item(1)

        fixOverflow();
        function fixOverflow() {

            let divTitleParent = parent01!.getBoundingClientRect().height
            let scrollHeightTitle = parent01!.scrollHeight;
            let style = window.getComputedStyle(htitle);
            let fontSize = parseFloat(style.fontSize);
            let titlePDiv = parent01!.getBoundingClientRect().height
            let titleHeight1 = htitle.getBoundingClientRect().height;

//                    Needs review, working good enough
            if (scrollHeightTitle > divTitleParent) {
                for (let i = 0; scrollHeightTitle > divTitleParent; i++) {
                    fontSize--;
                    if (fontSize == 8)
                        break

                    htitle.style.fontSize = fontSize + "px";
                    scrollHeightTitle = parent01!.scrollHeight;
                }
            }

            if (titleHeight1 < titlePDiv) {
                htitle.style.removeProperty("font-size");
                if (echild!.clientHeight > titlePDiv) {
                    fixOverflow()
                }
            }
        }
        const buttonGroup = titleToModify.item(0) as Element
        addEventClick()
        function addEventClick() {
            buttonGroup.addEventListener("click", () => {
                fixOverflow();
            })
        }
        v1++
    })

    return (
        <div className="col-span-8" ref={calendarRef}>
            <FullCalendar
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                aspectRatio={1.8}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    end: ''
                }}
                events={allEvents as EventSourceInput}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
            />
        </div>
    );
}