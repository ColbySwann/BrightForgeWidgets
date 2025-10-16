package swf.army.mil.widgetcapstone.colors;

import jakarta.persistence.*;

@Entity
public class Colors {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long colorId;
    private String colorCode;
    private String colorLabel;
    private String colorHex;

    public Colors(Long colorId, String colorCode, String colorLabel, String colorHex) {
        this.colorId = colorId;
        this.colorCode = colorCode;
        this.colorLabel = colorLabel;
        this.colorHex = colorHex;
    }

    public Colors(){
        this.colorId = null;
        this.colorCode = null;
        this.colorLabel = null;
        this.colorHex = null;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }

    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    public String getColorLabel() {
        return colorLabel;
    }

    public void setColorLabel(String colorLabel) {
        this.colorLabel = colorLabel;
    }

    public String getColorHex() {
        return colorHex;
    }

    public void setColorHex(String colorHex) {
        this.colorHex = colorHex;
    }

    @Override
    public String toString() {
        return "Colors{" +
                "colorId=" + colorId +
                ", colorCode='" + colorCode + '\'' +
                ", colorLabel='" + colorLabel + '\'' +
                ", colorHex='" + colorHex + '\'' +
                '}';
    }
}
