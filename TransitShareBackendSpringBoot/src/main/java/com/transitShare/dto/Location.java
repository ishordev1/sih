package com.transitShare.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
	  private String sessionId; // user socket ID
	    private double lat;
	    private double lng;
	    private String name;      // add this
	    private String type; 

}
