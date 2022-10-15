import toastr from "toastr";
import React, { useState } from "react";
import "toastr/build/toastr.min.css";

export default function showToast(type, title_, message_) {
    const ele = type;
    // const position = document.getElementsByName("positions");
    // let toastType;
    const title = title_;
    let message = message_;


    //Close Button
    const closeButton = false;

    //Debug
    const debug = false;

    //Progressbar
    const progressBar = 'checked';

    //Duplicates
    const preventDuplicates = false;

    //Newest on Top
    const newestOnTop = false;

    //position class
    let positionClass = "toast-top-right";

    //Fetch position
    // for (let p = 0; p < position.length; p++) {
    //     if (position[p].checked) positionClass = position[p].value;
    // }

    //Show Easing
    const showEasing = 'linear';

    //Hide Easing
    const hideEasing = 'linear';

    //show method
    const showMethod = 'fadein';

    //Hide method
    const hideMethod = 'fadeout';

    //show duration
    const showDuration = "300";

    //Hide duration
    const hideDuration = "300";

    //timeout
    const timeOut = "2000";

    //extended timeout
    const extendedTimeOut = "1000";

    //Fetch checked Type
    let toastType = ele;


    toastr.options = {
        positionClass: positionClass,
        timeOut: timeOut,
        extendedTimeOut: extendedTimeOut,
        closeButton: closeButton,
        debug: debug,
        progressBar: progressBar,
        preventDuplicates: preventDuplicates,
        newestOnTop: newestOnTop,
        showEasing: showEasing,
        hideEasing: hideEasing,
        // showMethod: showMethod,
        // hideMethod: hideMethod,
        showDuration: showDuration,
        hideDuration: hideDuration
    }

    if (toastType === "info") toastr.info(message, title);
    else if (toastType === "warning") toastr.warning(message, title);
    else if (toastType === "error") toastr.error(message, title);
    else toastr.success(message, title);
};
// closeButton: false
// debug: false
// extendedTimeOut: "1000"
// hideDuration: "1000"
// hideEasing: "linear"
// hideMethod: "fadeOut"
// newestOnTop: false
// positionClass: "toast-top-right"
// preventDuplicates: false
// progressBar: false
// showDuration: "300"
// showEasing: "swing"
// showMethod: "fadeIn"
// timeOut: "5000"