'use client'
import React from "react";

export default function TextViewer({ text }: { text: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 max-h-[75vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solutions</h2>
        <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
