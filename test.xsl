<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:import href="auteurs.xsl"/>
    <xsl:import href="livres.xsl"/>
    <xsl:template match="/">
        <html>
            <body>
                <h1>Auteurs</h1>
                <!-- show authors -->
                <xsl:call-template name="auteur-template">
                    <!-- show all the authors if the template called without parameters-->
                </xsl:call-template>
                <h1>Livres</h1>
                <!-- show books -->
                <xsl:call-template name="livres-template">
                    <xsl:with-param name="min" select="10"/>
                    <xsl:with-param name="max" select="11"/>
                    
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>    
</xsl:stylesheet>