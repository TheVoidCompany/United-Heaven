import { Box, Text, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import './SearchBar.css';

import { useDebounce } from "../../../hooks/debounceHook";
import LoadingScreen from "../LoadingScreen";

function SearchBar1(props) {

    const [isExpanded, setExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setLoading] = useState(false);



    const [results, setResults] = useState([]);
    const [noResults, setNoResults] = useState(false);


    const inputRef = useRef();

    const parentRef = React.useRef()

    useOutsideClick({
        ref: parentRef,
        handler: () => collapseContainer(),
    })

    //check if products are empty
    const isEmpty = !results || results.length === 0;


    const changeHandler = (e) => {
        // e.preventDefault();
        !isExpanded && setExpanded(true);
        setLoading(true);
        if (e.target.value.trim() === "") {
            setNoResults(false);
            setLoading(false);
        }
        setSearchQuery(e.target.value);
    };


    const collapseContainer = () => {
        setSearchQuery("");
        setLoading(false);

        setNoResults(false);
        setResults([]);
        if (inputRef.current) inputRef.current.value = "";
        setExpanded(false);
    };





    const handleSearch = (searchQuery) => {
        setLoading(true);

        //search here
        // search(searchQuery).then(res => {

        //     if (res.length === 0) {
        //         setNoResults(true);
        //     }
        //     setResults(res);
        //     setLoading(false);


        // })


    }


    useDebounce(searchQuery, 1000, () => handleSearch(searchQuery));




    //framer motion animation valus
    const containerVariants = {
        expanded: {
            height: "30em",
            boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
        },
        collapsed: {
            height: "3em",
            borderWidth: "2px",
        },
    };

    const containerTransition = { type: "spring", damping: 22, stiffness: 150 };




    return (
        <motion.div
            className="searchBarContainer"
            animate={isExpanded ? "expanded" : "collapsed"}
            style={{
                height: "3em",
                position: "absolute",
                top: 10,
                width: "inherit",
                zIndex: 2,
                overflow: "hidden"
            }}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
        >

            <div className="SearchInputContainer" style={{ overflow: "hidden" }}>
                <BiSearch size={28} color="#bebebe" />
                <input
                    className="searchInput"
                    style={{ width: '100%', height: '100%', borderWidth: 0, outline: 0, color: "black" }}
                    type="text"
                    placeholder="Search items and accounts"
                    ref={inputRef}
                    value={searchQuery}
                    onChange={changeHandler}
                />
                <AnimatePresence>
                    {isExpanded && (
                        <motion.span
                            className="CloseIcon"
                            whileHover={{ scale: 1.5, color: "#bebebe" }}
                            key="close-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={collapseContainer}
                            transition={{ duration: 0.2 }}
                        >
                            <AiFillCloseCircle cursor="pointer" size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
            {isExpanded && (
                <>
                    <div className="SearchContent">

                        {isLoading && (
                            <LoadingScreen />
                        )}
                        {!isLoading && isEmpty && !noResults && (
                            <div className="LoadingWrapper">
                                <span className="WarningMessage">Start typing to Search</span>
                            </div>
                        )}
                        {!isLoading && noResults && (
                            <div className="LoadingWrapper">
                                <span className="WarningMessage">{"No such results"}</span>
                            </div>
                        )}
                        {!isLoading && !isEmpty && (
                            <Box my="4" onClick={() => {
                                collapseContainer();
                            }
                            }>
                                <Text>hii</Text>
                            </Box>
                        )}
                    </div>
                </>


            )}


        </motion.div>
    )
}

export default SearchBar1


