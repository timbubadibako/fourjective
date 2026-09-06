"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import VideoService from "./ServiceType/VideoService";
import PhotoService from "./ServiceType/PhotoService";
import EditingService from "./ServiceType/EditingService";
import BookService from "./ServiceType/BookService";
import BookService2 from "./ServiceType/BookService2";
import ProductSpecification from "./ServiceType/ProductSpecification";
import AugmentedReality from "./ServiceType/AugmentedReality";
import YearbookDigital from "./ServiceType/YearbookDigital";
import MerchandiseYearbook from "./ServiceType/MerchandiseYearbook";

const ServiceType = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoIsInView = useInView(videoContainerRef, { once: false });
  const videoControls = useAnimation();

  const photoContainerRef = useRef<HTMLDivElement>(null);
  const photoIsInView = useInView(photoContainerRef, { once: false });
  const photoControls = useAnimation();

  const editingContainerRef = useRef<HTMLDivElement>(null);
  const editingIsInView = useInView(editingContainerRef, { once: false });
  const editingControls = useAnimation();

  const bookContainerRef = useRef<HTMLDivElement>(null);
  const bookIsInView = useInView(bookContainerRef, { once: false });
  const bookControls = useAnimation();

  const book2ContainerRef = useRef<HTMLDivElement>(null);
  const book2IsInView = useInView(book2ContainerRef, { once: false });
  const book2Controls = useAnimation();

  const productContainerRef = useRef<HTMLDivElement>(null);
  const productIsInView = useInView(productContainerRef, { once: false });
  const productControls = useAnimation();

  const augmentedContainerRef = useRef<HTMLDivElement>(null);
  const augmentedIsInView = useInView(augmentedContainerRef, { once: false });
  const augmentedControls = useAnimation();

  const yearbookContainerRef = useRef<HTMLDivElement>(null);
  const yearbookIsInView = useInView(yearbookContainerRef, { once: false });
  const yearbookControls = useAnimation();

  const merchContainerRef = useRef<HTMLDivElement>(null);
  const merchIsInView = useInView(merchContainerRef, { once: false });
  const merchControls = useAnimation();

  const containerVariants = {
    hidden: (direction: "left" | "right") => ({
      x: direction === "left" ? "-100%" : "100%",
      opacity: 0,
    }),
    visible: {
      x: "0%",
      opacity: 1,
      transition: { stiffness: 60 },
    },
  };

  useEffect(() => {
    if (videoIsInView) {
      videoControls.start("visible");
    } else {
      videoControls.start("hidden");
    }

    if (photoIsInView) {
      photoControls.start("visible");
    } else {
      photoControls.start("hidden");
    }

    if (editingIsInView) {
      editingControls.start("visible");
    } else {
      editingControls.start("hidden");
    }

    if (bookIsInView) {
      bookControls.start("visible");
    } else {
      bookControls.start("hidden");
    }

    if (book2IsInView) {
      book2Controls.start("visible");
    } else {
      book2Controls.start("hidden");
    }

    if (productIsInView) {
      productControls.start("visible");
    } else {
      productControls.start("hidden");
    }

    if (augmentedIsInView) {
      augmentedControls.start("visible");
    } else {
      augmentedControls.start("hidden");
    }

    if (yearbookIsInView) {
      yearbookControls.start("visible");
    } else {
      yearbookControls.start("hidden");
    }

    if (merchIsInView) {
      merchControls.start("visible");
    } else {
      merchControls.start("hidden");
    }
  }, [
    videoIsInView,
    photoIsInView,
    editingIsInView,
    bookIsInView,
    book2IsInView,
    productIsInView,
    augmentedIsInView,
    yearbookIsInView,
    merchIsInView,
    videoControls,
    photoControls,
    editingControls,
    bookControls,
    book2Controls,
    productControls,
    augmentedControls,
    yearbookControls,
    merchControls,
  ]);

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="mx-auto flex max-w-full flex-col gap-2 py-2 md:max-w-[1440px]">
        {/* Cards */}

        {/* Video Card */}
        <motion.div
          ref={videoContainerRef}
          initial="hidden"
          animate={videoControls}
          variants={containerVariants}
          custom="left"
        >
          <VideoService />
        </motion.div>

        {/* Photo Card */}
        <motion.div
          ref={photoContainerRef}
          initial="hidden"
          animate={photoControls}
          variants={containerVariants}
          custom="right"
        >
          <PhotoService />
        </motion.div>

        {/* Editing Card */}
        <motion.div
          ref={editingContainerRef}
          initial="hidden"
          animate={editingControls}
          variants={containerVariants}
          custom="left"
        >
          <EditingService />
        </motion.div>

        {/* Book Card */}
        <motion.div
          ref={bookContainerRef}
          initial="hidden"
          animate={bookControls}
          variants={containerVariants}
          custom="right"
        >
          <BookService />
        </motion.div>

        {/* Book2 Card */}
        <motion.div
          ref={book2ContainerRef}
          initial="hidden"
          animate={book2Controls}
          variants={containerVariants}
          custom="left"
        >
          <BookService2 />
        </motion.div>

        {/* Product Card */}
        <motion.div
          ref={productContainerRef}
          initial="hidden"
          animate={productControls}
          variants={containerVariants}
          custom="right"
        >
          <ProductSpecification />
        </motion.div>

        {/* Augmented Card */}
        <motion.div
          ref={augmentedContainerRef}
          initial="hidden"
          animate={augmentedControls}
          variants={containerVariants}
          custom="left"
        >
          <AugmentedReality />
        </motion.div>

        {/* Yearbook Card */}
        <motion.div
          ref={yearbookContainerRef}
          initial="hidden"
          animate={yearbookControls}
          variants={containerVariants}
          custom="right"
        >
          <YearbookDigital />
        </motion.div>

        {/* Merch Card */}
        <motion.div
          ref={merchContainerRef}
          initial="hidden"
          animate={merchControls}
          variants={containerVariants}
          custom="left"
        >
          <MerchandiseYearbook />
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceType;
