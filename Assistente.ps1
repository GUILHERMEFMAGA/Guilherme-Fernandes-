$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

. (Join-Path $PSScriptRoot 'Assistente.Core.ps1')
. (Join-Path $PSScriptRoot 'Assistente.Services.ps1')

$script:configPath = Join-Path $PSScriptRoot 'config.json'
$script:config = Get-AssistantConfig -Path $script:configPath

Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

[xml]$xaml = @'
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Name="MainWindow"
        Title="Assistente Guilherme — Inteligente e local"
        Width="960"
        Height="790"
        MinWidth="800"
        MinHeight="680"
        WindowStartupLocation="CenterScreen"
        Background="#08111F"
        Foreground="#F8FAFC"
        FontFamily="Segoe UI">
    <Window.Resources>
        <Style x:Key="PrimaryButton" TargetType="Button">
            <Setter Property="Background" Value="#7C3AED" />
            <Setter Property="Foreground" Value="White" />
            <Setter Property="BorderBrush" Value="#8B5CF6" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="FontWeight" Value="SemiBold" />
            <Setter Property="FontSize" Value="14" />
            <Setter Property="Padding" Value="18,11" />
            <Setter Property="Cursor" Value="Hand" />
        </Style>
        <Style x:Key="SecondaryButton" TargetType="Button">
            <Setter Property="Background" Value="#172033" />
            <Setter Property="Foreground" Value="#E2E8F0" />
            <Setter Property="BorderBrush" Value="#334155" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="FontWeight" Value="SemiBold" />
            <Setter Property="FontSize" Value="13" />
            <Setter Property="Padding" Value="14,9" />
            <Setter Property="Margin" Value="0,0,9,9" />
            <Setter Property="Cursor" Value="Hand" />
        </Style>
        <Style TargetType="TextBox">
            <Setter Property="Background" Value="#0F1A2C" />
            <Setter Property="Foreground" Value="#F8FAFC" />
            <Setter Property="BorderBrush" Value="#334155" />
            <Setter Property="BorderThickness" Value="1" />
            <Setter Property="CaretBrush" Value="#A78BFA" />
            <Setter Property="FontSize" Value="15" />
        </Style>
    </Window.Resources>

    <Grid Margin="28">
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="Auto" />
        </Grid.RowDefinitions>

        <Grid Grid.Row="0" Margin="0,0,0,20">
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="*" />
                <ColumnDefinition Width="Auto" />
            </Grid.ColumnDefinitions>

            <StackPanel Grid.Column="0">
                <TextBlock Text="ASSISTENTE GUILHERME · V2"
                           Foreground="#A78BFA"
                           FontSize="12"
                           FontWeight="Bold" />
                <TextBlock Text="Comandos, conversa e IA local"
                           FontSize="30"
                           FontWeight="Bold"
                           Margin="0,5,0,4" />
                <TextBlock Text="Use voz ou texto. Ações são limitadas e perguntas podem ser respondidas por uma IA privada no seu PC."
                           Foreground="#94A3B8"
                           FontSize="14"
                           TextWrapping="Wrap"
                           MaxWidth="590"
                           HorizontalAlignment="Left" />
            </StackPanel>

            <Border Grid.Column="1"
                    Background="#0F1A2C"
                    BorderBrush="#26364D"
                    BorderThickness="1"
                    CornerRadius="14"
                    Padding="16,11"
                    VerticalAlignment="Center"
                    MinWidth="270">
                <StackPanel>
                    <StackPanel Orientation="Horizontal" Margin="0,0,0,8">
                        <Ellipse x:Name="StatusDot"
                                 Width="10"
                                 Height="10"
                                 Fill="#64748B"
                                 Margin="0,0,9,0"
                                 VerticalAlignment="Center" />
                        <TextBlock x:Name="VoiceStatusText"
                                   Text="Preparando voz..."
                                   Foreground="#CBD5E1"
                                   VerticalAlignment="Center"
                                   FontSize="12"
                                   MaxWidth="235"
                                   TextWrapping="Wrap" />
                    </StackPanel>
                    <StackPanel Orientation="Horizontal">
                        <Ellipse x:Name="AiStatusDot"
                                 Width="10"
                                 Height="10"
                                 Fill="#64748B"
                                 Margin="0,0,9,0"
                                 VerticalAlignment="Center" />
                        <TextBlock x:Name="AiStatusText"
                                   Text="Verificando IA local..."
                                   Foreground="#CBD5E1"
                                   VerticalAlignment="Center"
                                   FontSize="12"
                                   MaxWidth="235"
                                   TextWrapping="Wrap" />
                    </StackPanel>
                </StackPanel>
            </Border>
        </Grid>

        <Border Grid.Row="1"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20"
                Margin="0,0,0,16">
            <StackPanel>
                <TextBlock Text="Fale um comando ou faça uma pergunta"
                           FontWeight="SemiBold"
                           FontSize="14"
                           Margin="0,0,0,9" />
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>

                    <TextBox x:Name="CommandInput"
                             Grid.Column="0"
                             Height="46"
                             Padding="13,11"
                             VerticalContentAlignment="Center"
                             ToolTip="Exemplo: abra o WhatsApp ou explique o que é inteligência artificial" />
                    <Button x:Name="SendButton"
                            Grid.Column="1"
                            Content="Executar"
                            Style="{StaticResource PrimaryButton}"
                            Margin="10,0,0,0"
                            MinWidth="105" />
                    <Button x:Name="ListenButton"
                            Grid.Column="2"
                            Content="🎙  Ouvir"
                            Style="{StaticResource SecondaryButton}"
                            Margin="10,0,0,0"
                            MinWidth="105" />
                </Grid>

                <Grid Margin="0,13,0,0">
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>
                    <TextBlock Grid.Column="0"
                               Text="Ex.: “me lembre de beber água em dez minutos” ou “anote comprar pão”"
                               Foreground="#64748B"
                               FontSize="12"
                               VerticalAlignment="Center" />
                    <CheckBox x:Name="SpeakRepliesCheckBox"
                              Grid.Column="1"
                              Content="Ler respostas em voz alta"
                              IsChecked="False"
                              Foreground="#94A3B8"
                              FontSize="12"
                              VerticalAlignment="Center" />
                </Grid>
            </StackPanel>
        </Border>

        <Border Grid.Row="2"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20,17,20,9"
                Margin="0,0,0,16">
            <StackPanel>
                <TextBlock Text="Atalhos seguros"
                           FontWeight="SemiBold"
                           FontSize="14"
                           Margin="0,0,0,12" />
                <WrapPanel>
                    <Button x:Name="YouTubeButton" Content="▶  YouTube" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="GoogleButton" Content="⌕  Google" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="WhatsAppButton" Content="●  WhatsApp" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="CalculatorButton" Content="＋  Calculadora" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="NotesButton" Content="✎  Notas" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="VsCodeButton" Content="&lt;/&gt;  VS Code" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="ConfigButton" Content="⚙  Configurar" Style="{StaticResource SecondaryButton}" />
                    <Button x:Name="RefreshAiButton" Content="↻  Verificar IA" Style="{StaticResource SecondaryButton}" />
                </WrapPanel>
            </StackPanel>
        </Border>

        <Border Grid.Row="3"
                Background="#0D1728"
                BorderBrush="#26364D"
                BorderThickness="1"
                CornerRadius="18"
                Padding="20">
            <Grid>
                <Grid.RowDefinitions>
                    <RowDefinition Height="Auto" />
                    <RowDefinition Height="*" />
                </Grid.RowDefinitions>
                <Grid Grid.Row="0" Margin="0,0,0,11">
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*" />
                        <ColumnDefinition Width="Auto" />
                    </Grid.ColumnDefinitions>
                    <TextBlock Grid.Column="0"
                               Text="Conversa e atividade"
                               FontWeight="SemiBold"
                               FontSize="14" />
                    <Button x:Name="ClearHistoryButton"
                            Grid.Column="1"
                            Content="Limpar conversa"
                            Background="Transparent"
                            Foreground="#94A3B8"
                            BorderThickness="0"
                            Cursor="Hand" />
                </Grid>
                <TextBox x:Name="HistoryTextBox"
                         Grid.Row="1"
                         IsReadOnly="True"
                         AcceptsReturn="True"
                         TextWrapping="Wrap"
                         VerticalScrollBarVisibility="Auto"
                         Padding="13"
                         FontSize="13"
                         Foreground="#CBD5E1" />
            </Grid>
        </Border>

        <TextBlock Grid.Row="4"
                   Text="Privacidade: voz, notas e IA ficam no computador. A IA nunca executa comandos fora da lista segura."
                   Foreground="#64748B"
                   FontSize="11"
                   TextAlignment="Center"
                   Margin="0,14,0,0" />
    </Grid>
</Window>
'@

$xmlReader = New-Object System.Xml.XmlNodeReader $xaml
try {
    $script:window = [Windows.Markup.XamlReader]::Load($xmlReader)
}
finally {
    $xmlReader.Close()
}

function Get-NamedControl {
    param([Parameter(Mandatory = $true)][string]$Name)
    return $script:window.FindName($Name)
}

$script:statusDot = Get-NamedControl -Name 'StatusDot'
$script:voiceStatusText = Get-NamedControl -Name 'VoiceStatusText'
$script:aiStatusDot = Get-NamedControl -Name 'AiStatusDot'
$script:aiStatusText = Get-NamedControl -Name 'AiStatusText'
$script:commandInput = Get-NamedControl -Name 'CommandInput'
$script:sendButton = Get-NamedControl -Name 'SendButton'
$script:listenButton = Get-NamedControl -Name 'ListenButton'
$script:speakRepliesCheckBox = Get-NamedControl -Name 'SpeakRepliesCheckBox'
$script:historyTextBox = Get-NamedControl -Name 'HistoryTextBox'
$script:clearHistoryButton = Get-NamedControl -Name 'ClearHistoryButton'
$script:youtubeButton = Get-NamedControl -Name 'YouTubeButton'
$script:googleButton = Get-NamedControl -Name 'GoogleButton'
$script:whatsAppButton = Get-NamedControl -Name 'WhatsAppButton'
$script:calculatorButton = Get-NamedControl -Name 'CalculatorButton'
$script:notesButton = Get-NamedControl -Name 'NotesButton'
$script:vsCodeButton = Get-NamedControl -Name 'VsCodeButton'
$script:configButton = Get-NamedControl -Name 'ConfigButton'
$script:refreshAiButton = Get-NamedControl -Name 'RefreshAiButton'

$script:recognizer = $null
$script:synthesizer = $null
$script:speechHandler = $null
$script:isListening = $false
$script:brushConverter = New-Object System.Windows.Media.BrushConverter
$script:aiStatus = [PSCustomObject]@{ Available = $false; Model = ''; Message = 'IA não verificada.' }
$script:aiJob = $null
$script:aiOriginalPrompt = ''
$script:conversation = New-Object System.Collections.ArrayList
$script:reminders = New-Object System.Collections.ArrayList
$script:isClosing = $false
$script:speakRepliesCheckBox.IsChecked = [bool]$script:config.voice.speakReplies
$script:window.Title = "Assistente $($script:config.assistantName) — Inteligente e local"

function Set-VoiceStatus {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][string]$Color
    )

    $script:voiceStatusText.Text = $Text
    $script:statusDot.Fill = $script:brushConverter.ConvertFromString($Color)
}

function Set-AiStatus {
    param(
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][string]$Color
    )

    $script:aiStatusText.Text = $Text
    $script:aiStatusDot.Fill = $script:brushConverter.ConvertFromString($Color)
}

function Add-HistoryEntry {
    param(
        [Parameter(Mandatory = $true)][string]$Speaker,
        [Parameter(Mandatory = $true)][string]$Text
    )

    $timestamp = Get-Date -Format 'HH:mm'
    $script:historyTextBox.AppendText("[$timestamp] ${Speaker}: $Text`r`n")
    $script:historyTextBox.ScrollToEnd()
}

function Add-ConversationMessage {
    param(
        [Parameter(Mandatory = $true)][ValidateSet('user', 'assistant')][string]$Role,
        [Parameter(Mandatory = $true)][string]$Content
    )

    [void]$script:conversation.Add([PSCustomObject]@{ role = $Role; content = $Content })
    while ($script:conversation.Count -gt 8) {
        $script:conversation.RemoveAt(0)
    }
}

function Speak-AssistantMessage {
    param([AllowEmptyString()][string]$Message)

    if (
        $null -ne $script:synthesizer -and
        $script:speakRepliesCheckBox.IsChecked -eq $true -and
        -not [string]::IsNullOrWhiteSpace($Message)
    ) {
        try {
            $script:synthesizer.SpeakAsyncCancelAll()
            [void]$script:synthesizer.SpeakAsync($Message)
        }
        catch {
            Add-HistoryEntry -Speaker 'Sistema' -Text 'Não foi possível reproduzir a resposta em voz alta.'
        }
    }
}

function Write-AssistantResponse {
    param([Parameter(Mandatory = $true)][string]$Message)

    Add-HistoryEntry -Speaker $script:config.assistantName -Text $Message
    Speak-AssistantMessage -Message $Message
}

function Stop-VoiceRecognition {
    if ($null -eq $script:recognizer -or -not $script:isListening) {
        return
    }

    try {
        $script:recognizer.RecognizeAsyncCancel()
    }
    catch {
        # O reconhecedor pode já estar encerrando.
    }

    $script:isListening = $false
    $script:listenButton.Content = '🎙  Ouvir'
    Set-VoiceStatus -Text 'Voz pronta. Clique em Ouvir.' -Color '#22C55E'
}

function Start-VoiceRecognition {
    if ($null -eq $script:recognizer) {
        Add-HistoryEntry -Speaker 'Sistema' -Text 'O reconhecimento de voz não está disponível. Confira o pacote de fala do Windows.'
        return
    }
    if ($script:isListening) {
        return
    }

    try {
        $script:recognizer.RecognizeAsync([System.Speech.Recognition.RecognizeMode]::Multiple)
        $script:isListening = $true
        $script:listenButton.Content = '■  Parar'
        Set-VoiceStatus -Text 'Ouvindo... diga um comando.' -Color '#A78BFA'
        Add-HistoryEntry -Speaker 'Sistema' -Text 'Microfone ativado. Diga um comando ou faça uma pergunta.'
    }
    catch {
        Set-VoiceStatus -Text 'Não foi possível acessar o microfone.' -Color '#EF4444'
        Add-HistoryEntry -Speaker 'Sistema' -Text "Falha ao iniciar o microfone: $($_.Exception.Message)"
    }
}

function Start-LocalAiRequest {
    param([Parameter(Mandatory = $true)][string]$Prompt)

    if (-not [bool]$script:aiStatus.Available) {
        Write-AssistantResponse -Message 'Não reconheci esse comando. Para perguntas livres, configure a IA local pelo arquivo “Configurar IA Local.bat”. Os comandos básicos continuam funcionando sem ela.'
        return
    }
    if ($null -ne $script:aiJob) {
        Add-HistoryEntry -Speaker 'Sistema' -Text 'A IA ainda está processando a solicitação anterior.'
        return
    }

    $script:aiOriginalPrompt = $Prompt
    Set-AiStatus -Text "Pensando com $($script:aiStatus.Model)..." -Color '#A78BFA'
    $script:sendButton.IsEnabled = $false
    Add-HistoryEntry -Speaker 'Sistema' -Text 'IA local processando...'
    try {
        $script:aiJob = Start-AssistantAiJob `
            -Model $script:aiStatus.Model `
            -UserMessage $Prompt `
            -TimeoutSeconds ([int]$script:config.ai.timeoutSeconds) `
            -Conversation @($script:conversation)
        $script:aiPollTimer.Start()
    }
    catch {
        $script:aiJob = $null
        $script:sendButton.IsEnabled = $true
        Set-AiStatus -Text "IA pronta: $($script:aiStatus.Model)" -Color '#22C55E'
        Add-HistoryEntry -Speaker 'Sistema' -Text "Não foi possível iniciar a IA local: $($_.Exception.Message)"
    }
}

function Complete-LocalAiRequest {
    if ($null -eq $script:aiJob) {
        return
    }

    $jobState = [string]$script:aiJob.State
    if ($jobState -notin @('Completed', 'Failed', 'Stopped')) {
        return
    }

    $output = $null
    try {
        $output = @(Receive-Job -Job $script:aiJob -ErrorAction SilentlyContinue) | Select-Object -Last 1
    }
    finally {
        Remove-Job -Job $script:aiJob -Force -ErrorAction SilentlyContinue
        $script:aiJob = $null
        $script:aiPollTimer.Stop()
        $script:sendButton.IsEnabled = $true
    }

    Set-AiStatus -Text "IA pronta: $($script:aiStatus.Model)" -Color '#22C55E'

    if (
        $null -eq $output -or
        $null -eq $output.PSObject.Properties['Success'] -or
        -not [bool]$output.Success
    ) {
        $errorMessage = if ($null -ne $output -and $null -ne $output.PSObject.Properties['Error']) {
            [string]$output.Error
        }
        else {
            'A IA local não respondeu.'
        }
        Add-HistoryEntry -Speaker 'Sistema' -Text "Falha da IA local: $errorMessage"
        return
    }

    if (
        $null -eq $output.PSObject.Properties['Content'] -or
        [string]::IsNullOrWhiteSpace([string]$output.Content)
    ) {
        Write-AssistantResponse -Message 'A IA local respondeu sem conteúdo utilizável.'
        return
    }

    $aiResult = ConvertFrom-AssistantAiResponse -Content ([string]$output.Content)
    if ($aiResult.Kind -eq 'answer') {
        $answer = $aiResult.Answer.Trim()
        if ($answer.Length -gt 4000) {
            $answer = $answer.Substring(0, 4000) + '…'
        }
        Write-AssistantResponse -Message $answer
        Add-ConversationMessage -Role 'user' -Content $script:aiOriginalPrompt
        Add-ConversationMessage -Role 'assistant' -Content $answer
        return
    }

    if ($aiResult.Kind -eq 'command') {
        $classified = Resolve-AssistantCommand `
            -Command $aiResult.Command `
            -CustomSites @($script:config.customSites)
        if ($classified.Action -ne 'Unknown') {
            Add-HistoryEntry -Speaker 'IA local' -Text "Entendi como: $($aiResult.Command)"
            Invoke-ResolvedCommand -Result $classified -FromAi $true
            return
        }
    }

    Write-AssistantResponse -Message 'A IA respondeu em um formato que não consegui validar com segurança. Tente escrever de outra forma.'
}

function Initialize-LocalAi {
    Set-AiStatus -Text 'Verificando IA local...' -Color '#F59E0B'
    $script:aiStatus = Get-AssistantOllamaStatus -Config $script:config
    if ([bool]$script:aiStatus.Available) {
        Set-AiStatus -Text "IA pronta: $($script:aiStatus.Model)" -Color '#22C55E'
    }
    else {
        Set-AiStatus -Text $script:aiStatus.Message -Color '#F59E0B'
    }
}

function Add-Reminder {
    param(
        [Parameter(Mandatory = $true)][long]$Seconds,
        [Parameter(Mandatory = $true)][string]$Label
    )

    if ($Seconds -lt 1 -or $Seconds -gt 604800) {
        throw 'O lembrete precisa estar entre 1 segundo e 7 dias.'
    }

    $dueAt = (Get-Date).AddSeconds($Seconds)
    [void]$script:reminders.Add([PSCustomObject]@{
        DueAt = $dueAt
        Label = $Label
    })
    return $dueAt
}

function Check-Reminders {
    $now = Get-Date
    foreach ($reminder in @($script:reminders)) {
        if ($reminder.DueAt -le $now) {
            [void]$script:reminders.Remove($reminder)
            $message = "Lembrete: $($reminder.Label)"
            Write-AssistantResponse -Message $message
            [void]$script:window.Activate()
            [System.Windows.MessageBox]::Show(
                $script:window,
                $message,
                "Assistente $($script:config.assistantName)",
                [System.Windows.MessageBoxButton]::OK,
                [System.Windows.MessageBoxImage]::Information
            ) | Out-Null
        }
    }
}

function Invoke-ResolvedCommand {
    param(
        [Parameter(Mandatory = $true)]$Result,
        [bool]$FromAi = $false
    )

    if ($Result.Action -eq 'Unknown') {
        if ($FromAi) {
            Write-AssistantResponse -Message 'Não consegui transformar essa resposta em uma ação segura.'
        }
        else {
            Start-LocalAiRequest -Prompt $Result.Parameter
        }
        return
    }

    try {
        switch ($Result.Action) {
            'OpenUrl' {
                Write-AssistantResponse -Message $Result.Message
                Start-Process $Result.Target
                break
            }
            'SearchYouTube' {
                Write-AssistantResponse -Message $Result.Message
                $encodedQuery = [System.Uri]::EscapeDataString($Result.Parameter)
                Start-Process "https://www.youtube.com/results?search_query=$encodedQuery"
                break
            }
            'SearchWeb' {
                Write-AssistantResponse -Message $Result.Message
                $encodedQuery = [System.Uri]::EscapeDataString($Result.Parameter)
                Start-Process "https://www.google.com/search?q=$encodedQuery"
                break
            }
            'OpenApplication' {
                Write-AssistantResponse -Message $Result.Message
                Start-Process $Result.Target
                break
            }
            'OpenFolder' {
                $folderPath = Resolve-AssistantKnownFolder -Folder $Result.Target
                if ([string]::IsNullOrWhiteSpace($folderPath) -or -not (Test-Path -LiteralPath $folderPath)) {
                    throw 'A pasta não foi encontrada neste computador.'
                }
                Write-AssistantResponse -Message $Result.Message
                Start-Process explorer.exe -ArgumentList "`"$folderPath`""
                break
            }
            'CreateNote' {
                [void](Add-AssistantNote -Text $Result.Parameter)
                Write-AssistantResponse -Message $Result.Message
                break
            }
            'ShowNotes' {
                $notesPath = Get-AssistantNotesPath
                Write-AssistantResponse -Message $Result.Message
                Start-Process notepad.exe -ArgumentList "`"$notesPath`""
                break
            }
            'ClearNotes' {
                $confirmation = [System.Windows.MessageBox]::Show(
                    $script:window,
                    'Deseja realmente apagar todas as notas salvas?',
                    'Confirmar exclusão das notas',
                    [System.Windows.MessageBoxButton]::YesNo,
                    [System.Windows.MessageBoxImage]::Warning
                )
                if ($confirmation -eq [System.Windows.MessageBoxResult]::Yes) {
                    Clear-AssistantNotes
                    Write-AssistantResponse -Message 'Todas as notas foram apagadas.'
                }
                else {
                    Write-AssistantResponse -Message 'Exclusão cancelada.'
                }
                break
            }
            'CopyToClipboard' {
                [System.Windows.Clipboard]::SetText($Result.Parameter)
                Write-AssistantResponse -Message $Result.Message
                break
            }
            'ReadClipboard' {
                if ([System.Windows.Clipboard]::ContainsText()) {
                    $clipboardText = [System.Windows.Clipboard]::GetText()
                    Write-AssistantResponse -Message "A área de transferência contém: $clipboardText"
                }
                else {
                    Write-AssistantResponse -Message 'A área de transferência não contém texto.'
                }
                break
            }
            'ShowTime' {
                Write-AssistantResponse -Message "Agora são $(Get-Date -Format 'HH:mm')."
                break
            }
            'ShowDate' {
                $culture = [System.Globalization.CultureInfo]::GetCultureInfo('pt-BR')
                Write-AssistantResponse -Message "Hoje é $((Get-Date).ToString('dddd, dd \d\e MMMM \d\e yyyy', $culture))."
                break
            }
            'ShowBattery' {
                $battery = Get-CimInstance -ClassName Win32_Battery -ErrorAction SilentlyContinue | Select-Object -First 1
                if ($null -eq $battery) {
                    Write-AssistantResponse -Message 'Este computador não informou uma bateria. Isso é normal em computadores de mesa.'
                }
                else {
                    Write-AssistantResponse -Message "A bateria está em $($battery.EstimatedChargeRemaining) por cento."
                }
                break
            }
            'ShowSystemInfo' {
                $computer = Get-CimInstance -ClassName Win32_ComputerSystem
                $operatingSystem = Get-CimInstance -ClassName Win32_OperatingSystem
                $memoryGb = [Math]::Round([double]$computer.TotalPhysicalMemory / (1024 * 1024 * 1024), 1)
                $message = "$($operatingSystem.Caption), computador $($computer.Manufacturer) $($computer.Model), com $memoryGb GB de memória RAM."
                Write-AssistantResponse -Message $message
                break
            }
            'SetTimer' {
                $seconds = [long]$Result.Target
                $dueAt = Add-Reminder -Seconds $seconds -Label $Result.Parameter
                Write-AssistantResponse -Message "$($Result.Message) Horário: $($dueAt.ToString('HH:mm:ss'))."
                break
            }
            'StopListening' {
                Write-AssistantResponse -Message $Result.Message
                Stop-VoiceRecognition
                break
            }
            'Help' {
                Write-AssistantResponse -Message $Result.Message
                $guidePath = Join-Path $PSScriptRoot 'GUIA-COMANDOS.md'
                if (Test-Path -LiteralPath $guidePath) {
                    Start-Process $guidePath
                }
                break
            }
            default {
                Write-AssistantResponse -Message $Result.Message
                break
            }
        }
    }
    catch {
        Add-HistoryEntry -Speaker 'Sistema' -Text "Não consegui executar a ação: $($_.Exception.Message)"
    }
}

function Submit-AssistantCommand {
    param(
        [AllowEmptyString()][string]$Command,
        [bool]$FromVoice = $false,
        [double]$Confidence = 0
    )

    if ([string]::IsNullOrWhiteSpace($Command)) {
        return
    }

    $trimmedCommand = $Command.Trim()
    if ($FromVoice) {
        $percentage = [Math]::Round($Confidence * 100)
        Add-HistoryEntry -Speaker "Você · voz $percentage%" -Text $trimmedCommand
    }
    else {
        Add-HistoryEntry -Speaker 'Você' -Text $trimmedCommand
    }

    $result = Resolve-AssistantCommand `
        -Command $trimmedCommand `
        -CustomSites @($script:config.customSites)
    Invoke-ResolvedCommand -Result $result
}

function Initialize-SpeechServices {
    try {
        Add-Type -AssemblyName System.Speech

        $installedRecognizers = @(
            [System.Speech.Recognition.SpeechRecognitionEngine]::InstalledRecognizers()
        )
        if ($installedRecognizers.Count -eq 0) {
            throw 'Nenhum pacote de reconhecimento de fala está instalado.'
        }

        $selectedRecognizer = $installedRecognizers |
            Where-Object { $_.Culture.Name -eq 'pt-BR' } |
            Select-Object -First 1
        if ($null -eq $selectedRecognizer) {
            $selectedRecognizer = $installedRecognizers |
                Where-Object { $_.Culture.TwoLetterISOLanguageName -eq 'pt' } |
                Select-Object -First 1
        }
        if ($null -eq $selectedRecognizer) {
            $selectedRecognizer = $installedRecognizers | Select-Object -First 1
        }

        $script:recognizer = [System.Speech.Recognition.SpeechRecognitionEngine]::new(
            $selectedRecognizer.Culture
        )
        $dictationGrammar = [System.Speech.Recognition.DictationGrammar]::new()
        $dictationGrammar.Name = 'Comandos e perguntas do Assistente Guilherme'
        $script:recognizer.LoadGrammar($dictationGrammar)
        $script:recognizer.SetInputToDefaultAudioDevice()

        $script:speechHandler = [System.EventHandler[System.Speech.Recognition.SpeechRecognizedEventArgs]] {
            param($sender, $eventArgs)

            if ($eventArgs.Result.Confidence -lt [double]$script:config.voice.minimumConfidence) {
                return
            }

            $recognizedText = $eventArgs.Result.Text
            $recognizedConfidence = [double]$eventArgs.Result.Confidence
            $uiCallback = [System.Action]({
                $script:commandInput.Text = $recognizedText
                Submit-AssistantCommand `
                    -Command $recognizedText `
                    -FromVoice $true `
                    -Confidence $recognizedConfidence
            }.GetNewClosure())
            [void]$script:window.Dispatcher.Invoke($uiCallback)
        }
        $script:recognizer.add_SpeechRecognized($script:speechHandler)

        $script:synthesizer = [System.Speech.Synthesis.SpeechSynthesizer]::new()
        $portugueseVoice = $script:synthesizer.GetInstalledVoices() |
            Where-Object {
                $_.Enabled -and
                $_.VoiceInfo.Culture.TwoLetterISOLanguageName -eq 'pt'
            } |
            Select-Object -First 1
        if ($null -ne $portugueseVoice) {
            $script:synthesizer.SelectVoice($portugueseVoice.VoiceInfo.Name)
        }

        Set-VoiceStatus `
            -Text "Voz pronta ($($selectedRecognizer.Culture.Name))." `
            -Color '#22C55E'
    }
    catch {
        $script:recognizer = $null
        $script:listenButton.IsEnabled = $false
        Set-VoiceStatus -Text 'Voz indisponível; use texto.' -Color '#F59E0B'
        Add-HistoryEntry -Speaker 'Sistema' -Text "Voz indisponível: $($_.Exception.Message)"
    }
}

$script:aiPollTimer = New-Object System.Windows.Threading.DispatcherTimer
$script:aiPollTimer.Interval = [TimeSpan]::FromMilliseconds(350)
$script:aiPollTimer.Add_Tick({ Complete-LocalAiRequest })

$script:reminderTimer = New-Object System.Windows.Threading.DispatcherTimer
$script:reminderTimer.Interval = [TimeSpan]::FromSeconds(1)
$script:reminderTimer.Add_Tick({ Check-Reminders })
$script:reminderTimer.Start()

$script:sendButton.Add_Click({
    Submit-AssistantCommand -Command $script:commandInput.Text
})

$script:commandInput.Add_KeyDown({
    param($sender, $eventArgs)
    if ($eventArgs.Key -eq [System.Windows.Input.Key]::Enter) {
        $eventArgs.Handled = $true
        Submit-AssistantCommand -Command $script:commandInput.Text
    }
})

$script:listenButton.Add_Click({
    if ($script:isListening) {
        Stop-VoiceRecognition
    }
    else {
        Start-VoiceRecognition
    }
})

$script:clearHistoryButton.Add_Click({
    $script:historyTextBox.Clear()
    $script:conversation.Clear()
})

$script:youtubeButton.Add_Click({ Submit-AssistantCommand -Command 'abra o YouTube' })
$script:googleButton.Add_Click({ Submit-AssistantCommand -Command 'abra o Google' })
$script:whatsAppButton.Add_Click({ Submit-AssistantCommand -Command 'abra o WhatsApp' })
$script:calculatorButton.Add_Click({ Submit-AssistantCommand -Command 'abra a calculadora' })
$script:notesButton.Add_Click({ Submit-AssistantCommand -Command 'mostre as notas' })
$script:vsCodeButton.Add_Click({
    try {
        Start-Process code -ArgumentList "`"$PSScriptRoot`""
    }
    catch {
        Add-HistoryEntry -Speaker 'Sistema' -Text 'O comando “code” não foi encontrado. Instale o VS Code e marque a opção para adicioná-lo ao PATH.'
    }
})
$script:configButton.Add_Click({
    try {
        if ($null -ne (Get-Command code -ErrorAction SilentlyContinue)) {
            Start-Process code -ArgumentList "`"$script:configPath`""
        }
        else {
            Start-Process notepad.exe -ArgumentList "`"$script:configPath`""
        }
    }
    catch {
        Add-HistoryEntry -Speaker 'Sistema' -Text "Não foi possível abrir o config.json: $($_.Exception.Message)"
    }
})
$script:refreshAiButton.Add_Click({ Initialize-LocalAi })

$script:window.Add_ContentRendered({
    [void]$script:commandInput.Focus()
    if ([bool]$script:config.voice.autoListen -and $null -ne $script:recognizer) {
        Start-VoiceRecognition
    }
})

$script:window.Add_Closing({
    $script:isClosing = $true
    $script:aiPollTimer.Stop()
    $script:reminderTimer.Stop()

    if ($null -ne $script:aiJob) {
        Stop-Job -Job $script:aiJob -ErrorAction SilentlyContinue
        Remove-Job -Job $script:aiJob -Force -ErrorAction SilentlyContinue
        $script:aiJob = $null
    }

    if ($null -ne $script:recognizer) {
        try {
            if ($script:isListening) {
                $script:recognizer.RecognizeAsyncCancel()
            }
            if ($null -ne $script:speechHandler) {
                $script:recognizer.remove_SpeechRecognized($script:speechHandler)
            }
            $script:recognizer.UnloadAllGrammars()
            $script:recognizer.Dispose()
        }
        catch {
            # A janela já está fechando.
        }
    }

    if ($null -ne $script:synthesizer) {
        try {
            $script:synthesizer.SpeakAsyncCancelAll()
            $script:synthesizer.Dispose()
        }
        catch {
            # A janela já está fechando.
        }
    }
})

if ($null -ne $script:config.PSObject.Properties['configWarning']) {
    Add-HistoryEntry -Speaker 'Sistema' -Text "O config.json contém um erro e os padrões foram usados: $($script:config.configWarning)"
}
Add-HistoryEntry -Speaker $script:config.assistantName -Text 'Olá! Posso executar comandos, guardar notas, criar lembretes e, com a IA local configurada, conversar e responder perguntas.'
Initialize-SpeechServices
Initialize-LocalAi
[void]$script:window.ShowDialog()
