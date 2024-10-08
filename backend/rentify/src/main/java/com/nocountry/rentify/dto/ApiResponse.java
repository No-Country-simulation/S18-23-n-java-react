package com.nocountry.rentify.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "A generic response object used to standardize API responses.")
public record ApiResponse<T>(
        @Schema(description = "Indicates whether the operation was successful or not.", example = "true")
        boolean isSuccess,

        @Schema(description = "A message providing additional information about the result of the operation.", example = "Operation successful")
        String message,

        @Schema(description = "The data payload returned by the operation.", nullable = true)
        T data
) {

    /**
     * Constructs an ApiResponse indicating a successful operation with the given data.
     *
     * @param data the data payload
     */
    public ApiResponse(T data) {
        this(true, "Operation successful", data);
    }

    /**
     * Constructs an ApiResponse with the given success status and data.
     *
     * @param isSuccess indicates whether the operation was successful
     * @param data the data payload
     */
    public ApiResponse(boolean isSuccess, T data) {
        this(isSuccess, isSuccess ? "Operation successful" : "An error occurred", data);
    }

}
