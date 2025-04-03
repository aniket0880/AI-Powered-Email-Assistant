package com.email_writer;

import lombok.Data;

//using lombok instead of getter setter
@Data
//to get data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
