import { Box, Divider, Flex, Image, Text, useColorModeValue, useOutsideClick } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoSearch } from 'react-icons/io5';
import LoadingScreen from "../LoadingScreen";
import './SearchBar.css';

import { useDebounce } from "../../../hooks/debounceHook";

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
            className={`searchBarContainer ${useColorModeValue("search-bar-light", "search-bar-dark")}`}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            transition={containerTransition}
            ref={parentRef}
        >

            <div className="SearchInputContainer" style={{ overflow: "hidden" }}>
                <BiSearch size={28} color="#bebebe" />
                <input
                    className={`searchInput ${useColorModeValue("search-bar-light", "search-bar-dark")}`}
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
            <Divider />
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
                                <span className="WarningMessage">No such results</span>
                            </div>
                        )}
                        {!isLoading && !isEmpty && (
                            <Box>
                                <UserCard />
                                <ActionCard />
                            </Box>
                        )}
                    </div>
                </>


            )}


        </motion.div>
    )
}


const UserCard = () => {
    return (
        <Box>
            <Flex py="4" align="center">
                <Image
                    boxSize='2rem'
                    borderRadius='full'
                    src='https://placekitten.com/100/100'
                    alt='Fluffybuns the destroyer'
                    mr='12px'
                />
                <Text fontWeight={"600"}>josh bush</Text>

            </Flex>
            <Divider />
        </Box>
    )
}

const ActionCard = () => {
    <Box>
        <Flex py="4" align="center">
            <Box mr='12px'>
                <IoSearch
                    size={"2rem"}
                />
            </Box>
            <Box>
                <Text
                    color={'green.500'}
                    textTransform={'uppercase'}
                    fontWeight={800}
                    fontSize={'xs'}
                    letterSpacing={1.1}>
                    Action
                </Text>
                <Text fontWeight={"600"} noOfLines={2}>Clean Marina Beach on 12 dec morning Clean Marina Beach on 12 dec morning</Text>
            </Box>
        </Flex>
        <Divider />
    </Box>
}

export default SearchBar1


