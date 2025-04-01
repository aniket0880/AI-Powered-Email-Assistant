package com.email_writer;

import lombok.Data;

@Data
//to get data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
