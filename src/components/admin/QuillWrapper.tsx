"use client";

import React, { forwardRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props extends ReactQuillProps {
  forwardedRef?: React.Ref<any>;
}

const QuillWrapper = forwardRef<any, ReactQuillProps>((props, ref) => {
  return <ReactQuill {...props} ref={ref} />;
});

QuillWrapper.displayName = 'QuillWrapper';

export default QuillWrapper;
